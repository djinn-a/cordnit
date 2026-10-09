/**
 * Release gate: fails unless the site Navbar and Footer blocks exist, are
 * published, match today's schema and link only to live pages.
 *
 *   npm run cms:verify-chrome
 */
import { and, eq } from "drizzle-orm";
import { SITE_FOOTER_BLOCK_KEY, SITE_NAVBAR_BLOCK_KEY } from "@/lib/cms/document";
import { sectionContentSchemas } from "@/lib/cms/registry";
import { collectChromeLinks, findDeadInternalLinks } from "@/lib/cms/site-chrome";
import { loadLivePaths } from "@/server/cms/services/site-chrome.service";
import { db } from "@/server/db/client";
import { globalBlockVersions, globalBlocks } from "@/server/db/schema";

async function check(key: string, type: "navbar" | "footer", livePaths: Set<string>): Promise<string[]> {
  const [row] = await db()
    .select({ type: globalBlocks.type, version: globalBlocks.publishedVersion, content: globalBlockVersions.content })
    .from(globalBlocks)
    .leftJoin(
      globalBlockVersions,
      and(eq(globalBlockVersions.blockId, globalBlocks.id), eq(globalBlockVersions.version, globalBlocks.publishedVersion)),
    )
    .where(eq(globalBlocks.key, key));
  if (!row) return [`missing (run npm run cms:seed-chrome)`];
  if (row.type !== type) return [`has type "${row.type}", expected "${type}"`];
  if (row.version === null || !row.content) return ["never published"];
  const parsed = sectionContentSchemas[type].safeParse(row.content);
  if (!parsed.success) return parsed.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`);
  return findDeadInternalLinks(collectChromeLinks(type, parsed.data), livePaths).map((d) => `${d.where} links to unpublished ${d.href}`);
}

async function main() {
  const livePaths = await loadLivePaths();
  let failed = false;
  for (const [key, type] of [[SITE_NAVBAR_BLOCK_KEY, "navbar"], [SITE_FOOTER_BLOCK_KEY, "footer"]] as const) {
    const problems = await check(key, type, livePaths);
    failed ||= problems.length > 0;
    console.log(problems.length ? `  FAIL  ${key}\n    ${problems.join("\n    ")}` : `  ok    ${key}`);
  }
  if (failed) throw new Error("Site chrome verification failed.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
