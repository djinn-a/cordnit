import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import {
  HOME_SLUG,
  PAGES_LIST_TAG,
  REDIRECTS_TAG,
  SITE_FOOTER_BLOCK_KEY,
  SITE_NAVBAR_BLOCK_KEY,
  blockTag,
  blockKeyTag,
  isBlockRef,
  pageTag,
  type InlineSectionNode,
  type PublishedBlock,
  type PublishedPageDocument,
} from "@/lib/cms/document";
import { isSectionType, type SectionType } from "@/lib/cms/types";
import { sectionContentSchemas, type SectionContentMap } from "@/lib/cms/registry";
import { db } from "@/server/db/client";
import { globalBlockVersions, globalBlocks, publishedPages, redirects } from "@/server/db/schema";

type SiteChromeType = Extract<SectionType, "navbar" | "footer">;
type SiteChromeBlock =
  | { blockId: string; type: "navbar"; props: SectionContentMap["navbar"]; version: number }
  | { blockId: string; type: "footer"; props: SectionContentMap["footer"]; version: number };

const CODE_OWNED_ROUTES = new Set(["/breach", "/privacy", "/privacy-policy"]);

/**
 * Public read path. Every function is cached indefinitely and invalidated only
 * by tag on publish, so visitors never wait on the database.
 */
export async function getPublishedPage(slug: string): Promise<PublishedPageDocument | null> {
  "use cache";
  cacheLife("max");
  cacheTag(pageTag(slug));
  const [row] = await db()
    .select({ document: publishedPages.document })
    .from(publishedPages)
    .where(eq(publishedPages.slug, slug));
  return row?.document ?? null;
}

export async function getPublishedBlock(blockId: string): Promise<PublishedBlock | null> {
  "use cache";
  cacheLife("max");
  cacheTag(blockTag(blockId));
  const [row] = await db()
    .select({
      id: globalBlocks.id,
      type: globalBlocks.type,
      props: globalBlocks.publishedProps,
      version: globalBlocks.publishedVersion,
    })
    .from(globalBlocks)
    .where(eq(globalBlocks.id, blockId));
  if (!row?.props || row.version === null || !isSectionType(row.type)) return null;
  return { blockId: row.id, type: row.type, props: row.props, version: row.version };
}

export type PublishedRoute = { slug: string; publishedAt: string; noindex: boolean; canonical?: string };

export async function listPublishedRoutes(): Promise<PublishedRoute[]> {
  "use cache";
  cacheLife("max");
  cacheTag(PAGES_LIST_TAG);
  const rows = await db()
    .select({
      slug: publishedPages.slug,
      publishedAt: publishedPages.publishedAt,
      noindex: publishedPages.noindex,
      canonical: sql<string | null>`${publishedPages.document}->'seo'->>'canonical'`,
    })
    .from(publishedPages);
  return rows.map((r) => ({
    slug: r.slug,
    publishedAt: r.publishedAt.toISOString(),
    noindex: r.noindex,
    canonical: r.canonical ?? undefined,
  }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Restore stable CMS list IDs: the public props merger strips editor-only IDs. */
function restoreListItemIds(content: unknown, props: unknown): unknown {
  if (Array.isArray(content) && Array.isArray(props)) {
    return props.map((item, index) => restoreListItemIds(content[index], item));
  }
  if (!isRecord(content) || !isRecord(props)) return props;
  const restored: Record<string, unknown> = { ...props };
  if (typeof content._id === "string") restored._id = content._id;
  for (const [key, value] of Object.entries(props)) {
    if (key in content) restored[key] = restoreListItemIds(content[key], value);
  }
  return restored;
}

function routeSlugFromHref(href: string): string | null {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return null;
  try {
    const pathname = decodeURIComponent(new URL(href, "https://cms.invalid").pathname);
    if (pathname.startsWith("//") || pathname.includes("\\")) return null;
    const normalized = pathname.replace(/\/+$/, "") || "/";
    return normalized === "/" ? HOME_SLUG : normalized.slice(1).toLowerCase();
  } catch {
    return null;
  }
}

function safeCmsHref(href: string, publishedSlugs: ReadonlySet<string>, redirectPaths: ReadonlySet<string>): string {
  if (href === "" || href.startsWith("#")) return href;
  if (/^https:\/\//i.test(href) || /^(mailto|tel):[^\s]+$/i.test(href)) return href;
  const slug = routeSlugFromHref(href);
  if (slug === null) return "";
  const path = href.split(/[?#]/, 1)[0]?.replace(/\/+$/, "") || "/";
  return publishedSlugs.has(slug) || CODE_OWNED_ROUTES.has(path) || redirectPaths.has(path) ? href : "";
}

function sanitizeNavbarLinks(
  content: SectionContentMap["navbar"],
  publishedSlugs: ReadonlySet<string>,
  redirectPaths: ReadonlySet<string>,
): SectionContentMap["navbar"] {
  return {
    ...content,
    logoHref: safeCmsHref(content.logoHref ?? "", publishedSlugs, redirectPaths),
    topBarBreachHref: safeCmsHref(content.topBarBreachHref, publishedSlugs, redirectPaths),
    navLinks: content.navLinks.map((item) => ({ ...item, href: safeCmsHref(item.href, publishedSlugs, redirectPaths) })),
    solutionsDropdown: content.solutionsDropdown.map((item) => ({
      ...item,
      slug: safeCmsHref(item.slug ? `/${item.slug}` : "", publishedSlugs, redirectPaths).replace(/^\//, ""),
    })),
    megaMenu: {
      ...content.megaMenu,
      exploreAllHref: safeCmsHref(content.megaMenu.exploreAllHref, publishedSlugs, redirectPaths),
    },
  };
}

function sanitizeFooterLinks(
  content: SectionContentMap["footer"],
  publishedSlugs: ReadonlySet<string>,
  redirectPaths: ReadonlySet<string>,
): SectionContentMap["footer"] {
  return {
    ...content,
    logoHref: safeCmsHref(content.logoHref ?? "", publishedSlugs, redirectPaths),
    navColumns: content.navColumns.map((column) => ({
      ...column,
      links: column.links.map((item) => ({ ...item, href: safeCmsHref(item.href, publishedSlugs, redirectPaths) })),
    })),
    socialLinks: content.socialLinks.map((item) => ({ ...item, href: safeCmsHref(item.href, publishedSlugs, redirectPaths) })),
    newsletter: { ...content.newsletter, privacyLinkHref: safeCmsHref(content.newsletter.privacyLinkHref, publishedSlugs, redirectPaths) },
    media: { ...content.media, href: safeCmsHref(content.media.href, publishedSlugs, redirectPaths) },
    legalLinks: content.legalLinks.map((item) => ({ ...item, href: safeCmsHref(item.href, publishedSlugs, redirectPaths) })),
  };
}

/**
 * Loads the two site-shell blocks from Global Blocks. Missing internal routes
 * are made inert at render time; publishing the route invalidates this cache.
 */
export async function getPublishedBlockByKey(key: string, type: SiteChromeType): Promise<SiteChromeBlock | null> {
  "use cache";
  cacheLife("max");
  cacheTag(blockKeyTag(key), PAGES_LIST_TAG, REDIRECTS_TAG);
  if ((key === SITE_NAVBAR_BLOCK_KEY) !== (type === "navbar") || (key === SITE_FOOTER_BLOCK_KEY) !== (type === "footer")) return null;

  const [row, routes, redirectMap] = await Promise.all([
    db()
      .select({
        id: globalBlocks.id,
        type: globalBlocks.type,
        publishedContent: globalBlockVersions.content,
        props: globalBlocks.publishedProps,
        version: globalBlocks.publishedVersion,
      })
      .from(globalBlocks)
      .leftJoin(
        globalBlockVersions,
        and(
          eq(globalBlockVersions.blockId, globalBlocks.id),
          eq(globalBlockVersions.version, globalBlocks.publishedVersion),
        ),
      )
      .where(eq(globalBlocks.key, key))
      .then((rows) => rows[0]),
    listPublishedRoutes(),
    getRedirectMap(),
  ]);
  if (!row) {
    console.error(`[CMS] The published ${type} Global Block with key "${key}" was not found.`);
    return null;
  }
  if (!row.props || row.version === null || row.type !== type || !isSectionType(row.type)) {
    console.error(`[CMS] The published Global Block with key "${key}" has an unsupported type or no published version.`);
    return null;
  }

  const publishedSlugs = new Set(routes.map((route) => route.slug));
  const redirectPaths = new Set(Object.keys(redirectMap));
  if (row.type === "navbar") {
    const content = sectionContentSchemas.navbar.safeParse(row.publishedContent);
    if (!content.success) {
      console.error("[CMS] The published navbar Global Block content does not match its schema.");
      return null;
    }
    const restored = restoreListItemIds(content.data, row.props);
    const props = sectionContentSchemas.navbar.safeParse(restored);
    if (!props.success) {
      console.error("[CMS] The published navbar Global Block properties do not match its schema.");
      return null;
    }
    return { blockId: row.id, type: row.type, props: sanitizeNavbarLinks(props.data, publishedSlugs, redirectPaths), version: row.version };
  }

  const content = sectionContentSchemas.footer.safeParse(row.publishedContent);
  if (!content.success) {
    console.error("[CMS] The published footer Global Block content does not match its schema.");
    return null;
  }
  const restored = restoreListItemIds(content.data, row.props);
  const props = sectionContentSchemas.footer.safeParse(restored);
  if (!props.success) {
    console.error("[CMS] The published footer Global Block properties do not match its schema.");
    return null;
  }
  return { blockId: row.id, type: row.type, props: sanitizeFooterLinks(props.data, publishedSlugs, redirectPaths), version: row.version };
}

export type RedirectTarget = { toPath: string; statusCode: number };

export async function getRedirectMap(): Promise<Record<string, RedirectTarget>> {
  "use cache";
  cacheLife("max");
  cacheTag(REDIRECTS_TAG);
  const rows = await db().select().from(redirects);
  return Object.fromEntries(rows.map((r) => [r.fromPath, { toPath: r.toPath, statusCode: r.statusCode }]));
}

/** Inlines Global Block references. Each block read carries its own cache tag. */
export async function resolveSections(doc: PublishedPageDocument): Promise<InlineSectionNode[]> {
  const blocks = await Promise.all(
    doc.sections.map((node) => (isBlockRef(node) ? getPublishedBlock(node.blockId) : Promise.resolve(null))),
  );
  const out: InlineSectionNode[] = [];
  doc.sections.forEach((node, i) => {
    if (!isBlockRef(node)) {
      out.push(node);
      return;
    }
    const block = blocks[i];
    if (block) out.push({ _key: node._key, _type: block.type, props: block.props });
  });
  return out;
}

/** Uncached: used by scripts and the verify tool. */
export async function loadPublishedDocuments(slugs?: string[]) {
  const query = db().select({ slug: publishedPages.slug, document: publishedPages.document }).from(publishedPages);
  return slugs?.length ? query.where(inArray(publishedPages.slug, slugs)) : query;
}
