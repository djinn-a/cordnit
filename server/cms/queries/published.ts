import "server-only";
import { eq, inArray } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import {
  PAGES_LIST_TAG,
  REDIRECTS_TAG,
  blockTag,
  isBlockRef,
  pageTag,
  type InlineSectionNode,
  type PublishedBlock,
  type PublishedPageDocument,
} from "@/lib/cms/document";
import { isSectionType } from "@/lib/cms/types";
import { db } from "@/server/db/client";
import { globalBlocks, publishedPages, redirects } from "@/server/db/schema";

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

export type PublishedRoute = { slug: string; publishedAt: string; noindex: boolean };

export async function listPublishedRoutes(): Promise<PublishedRoute[]> {
  "use cache";
  cacheLife("max");
  cacheTag(PAGES_LIST_TAG);
  const rows = await db()
    .select({ slug: publishedPages.slug, publishedAt: publishedPages.publishedAt, noindex: publishedPages.noindex })
    .from(publishedPages);
  return rows.map((r) => ({ slug: r.slug, publishedAt: r.publishedAt.toISOString(), noindex: r.noindex }));
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
