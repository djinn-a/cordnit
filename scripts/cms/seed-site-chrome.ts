/**
 * Creates and publishes the site Navbar and Footer Global Blocks from the code
 * defaults when they do not exist yet. Existing blocks are never touched.
 *
 *   npm run cms:seed-chrome
 */
import { blockKeyTag } from "@/lib/cms/document";
import { seedSiteChromeBlocks } from "@/server/cms/services/blocks.service";
import { purgeSiteCache, superAdminId } from "./_lib";

async function main() {
  const created = await seedSiteChromeBlocks(await superAdminId());
  if (created.length === 0) {
    console.log("Site Navbar and Footer blocks already exist; nothing to seed.");
    return;
  }
  for (const block of created) console.log(`  ok    ${block.key}  v${block.publishedVersion}`);
  await purgeSiteCache(created.map((b) => blockKeyTag(b.key ?? "")));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
