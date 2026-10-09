import "server-only";
import { inArray } from "drizzle-orm";
import { SITE_FOOTER_BLOCK_KEY, SITE_NAVBAR_BLOCK_KEY, slugToPath } from "@/lib/cms/document";
import { collectChromeLinks, findDeadInternalLinks, internalPath } from "@/lib/cms/site-chrome";
import { db, type Transaction } from "@/server/db/client";
import { globalBlockVersions, globalBlocks, publishedPages, redirects } from "@/server/db/schema";
import { errors } from "@/server/errors";

type Conn = Transaction | ReturnType<typeof db>;

export function isSiteChromeKey(key: string | null | undefined): boolean {
  return key === SITE_NAVBAR_BLOCK_KEY || key === SITE_FOOTER_BLOCK_KEY;
}

/** Lowercase paths a visitor can reach: published pages plus redirect sources. */
export async function loadLivePaths(conn: Conn = db()): Promise<Set<string>> {
  const [pages, sources] = await Promise.all([
    conn.select({ slug: publishedPages.slug }).from(publishedPages),
    conn.select({ from: redirects.fromPath }).from(redirects),
  ]);
  return new Set([...pages.map((p) => slugToPath(p.slug)), ...sources.map((r) => r.from.toLowerCase())]);
}

/** Publishing site chrome must never put a link to a missing page on every page of the site. */
export async function assertChromeLinksLive(tx: Conn, type: string, content: unknown): Promise<void> {
  const links = collectChromeLinks(type, content);
  if (links.length === 0) return;
  const dead = findDeadInternalLinks(links, await loadLivePaths(tx));
  if (dead.length === 0) return;
  const list = dead.slice(0, 8).map((d) => `${d.where} → ${d.href}`);
  throw errors.validation(
    `These links point to pages that are not published: ${list.join("; ")}${dead.length > 8 ? ` and ${dead.length - 8} more` : ""}. Publish those pages, fix the links, or leave them blank.`,
  );
}

/** Published site chrome blocks (key + display name) whose live version links to `path`. */
export async function chromeBlocksLinkingTo(conn: Conn, path: string): Promise<string[]> {
  const blocks = await conn
    .select({ id: globalBlocks.id, name: globalBlocks.name, type: globalBlocks.type, version: globalBlocks.publishedVersion })
    .from(globalBlocks)
    .where(inArray(globalBlocks.key, [SITE_NAVBAR_BLOCK_KEY, SITE_FOOTER_BLOCK_KEY]));
  const live = blocks.filter((b) => b.version !== null);
  if (live.length === 0) return [];
  const versions = await conn
    .select({ blockId: globalBlockVersions.blockId, version: globalBlockVersions.version, content: globalBlockVersions.content })
    .from(globalBlockVersions)
    .where(inArray(globalBlockVersions.blockId, live.map((b) => b.id)));
  const target = internalPath(path);
  return live
    .filter((b) => {
      const content = versions.find((v) => v.blockId === b.id && v.version === b.version)?.content;
      return content && collectChromeLinks(b.type, content).some((l) => internalPath(l.href) === target);
    })
    .map((b) => b.name);
}
