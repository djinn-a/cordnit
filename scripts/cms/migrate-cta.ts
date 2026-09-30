/**
 * One-off: replaces the root-layout CTA and the "call-to-action" Global Block with
 * an inline `cta` section as the last section of every page, then publishes each page.
 *
 *   npm run cms:migrate-cta -- --dry-run   # print the plan, write nothing
 *   npm run cms:migrate-cta                # apply, publish, delete the block, purge cache
 */
import { isDeepStrictEqual } from "node:util";
import { asc, eq, inArray } from "drizzle-orm";
import { PAGES_LIST_TAG, blockTag, pageTag, slugToPath } from "@/lib/cms/document";
import { recordAudit } from "@/server/cms/audit";
import { touchPage } from "@/server/cms/locking";
import { keyBetween } from "@/server/cms/positions";
import { getSectionDefaults } from "@/server/cms/section-defaults";
import { publishPage } from "@/server/cms/services/publish.service";
import { parseSectionContent } from "@/server/cms/validation";
import { db } from "@/server/db/client";
import { globalBlocks, pageSections, pages, type PageSectionRow } from "@/server/db/schema";
import { arg, purgeSiteCache, superAdminId } from "./_lib";

const BLOCK_KEY = "call-to-action";
const CTA_TYPE = "cta";

type Action =
  | { kind: "insert" }
  | { kind: "normalize"; keep: PageSectionRow; extras: PageSectionRow[]; move: boolean }
  | { kind: "none" };

function planFor(sections: PageSectionRow[], defaults: ReturnType<typeof getSectionDefaults>): Action {
  const ctas = sections.filter((s) => s.type === CTA_TYPE);
  if (ctas.length === 0) return { kind: "insert" };
  const keep = ctas[ctas.length - 1];
  const extras = ctas.slice(0, -1);
  const move = sections[sections.length - 1]?.id !== keep.id;
  const clean =
    extras.length === 0 &&
    !move &&
    !keep.isHidden &&
    !keep.globalBlockId &&
    isDeepStrictEqual(keep.content, defaults.content) &&
    isDeepStrictEqual(keep.systemProps, defaults.systemProps);
  return clean ? { kind: "none" } : { kind: "normalize", keep, extras, move };
}

function describe(action: Action): string {
  if (action.kind === "insert") return "add cta section at the end";
  if (action.kind === "none") return "cta already in place";
  const parts = ["reset cta content"];
  if (action.move) parts.push("move to end");
  if (action.keep.isHidden) parts.push("unhide");
  if (action.keep.globalBlockId) parts.push("detach from Global Block");
  if (action.extras.length) parts.push(`remove ${action.extras.length} duplicate(s)`);
  return parts.join(", ");
}

async function applyToPage(pageId: string, lockVersion: number, actorId: string) {
  const defaults = getSectionDefaults(CTA_TYPE);
  const content = parseSectionContent(CTA_TYPE, defaults.content);
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, pageId, lockVersion, actorId);
    const sections = await tx
      .select()
      .from(pageSections)
      .where(eq(pageSections.pageId, page.id))
      .orderBy(asc(pageSections.position));
    const action = planFor(sections, defaults);
    const last = sections[sections.length - 1]?.position ?? null;

    if (action.kind === "insert") {
      const [section] = await tx
        .insert(pageSections)
        .values({
          pageId: page.id,
          type: CTA_TYPE,
          position: keyBetween(last, null),
          content,
          systemProps: defaults.systemProps,
        })
        .returning();
      await recordAudit(tx, {
        actorId,
        action: "section.add",
        entityType: "section",
        entityId: section.id,
        summary: `Added Call To Action to ${slugToPath(page.slug)} (decoupled from site layout)`,
      });
    } else if (action.kind === "normalize") {
      if (action.extras.length) {
        await tx.delete(pageSections).where(inArray(pageSections.id, action.extras.map((s) => s.id)));
      }
      await tx
        .update(pageSections)
        .set({
          content,
          systemProps: defaults.systemProps,
          globalBlockId: null,
          isHidden: false,
          label: null,
          ...(action.move ? { position: keyBetween(last, null) } : {}),
        })
        .where(eq(pageSections.id, action.keep.id));
      await recordAudit(tx, {
        actorId,
        action: "section.update",
        entityType: "section",
        entityId: action.keep.id,
        summary: `Normalized Call To Action on ${slugToPath(page.slug)}: ${describe(action)}`,
      });
    }
    return page.lockVersion;
  });
}

async function deleteCtaBlock(actorId: string): Promise<string | null> {
  return db().transaction(async (tx) => {
    const [block] = await tx.select().from(globalBlocks).where(eq(globalBlocks.key, BLOCK_KEY));
    if (!block) return null;
    const [used] = await tx
      .select({ id: pageSections.id })
      .from(pageSections)
      .where(eq(pageSections.globalBlockId, block.id))
      .limit(1);
    if (used) throw new Error(`Global Block "${block.name}" is still used by a page section; not deleting it.`);
    await tx.delete(globalBlocks).where(eq(globalBlocks.id, block.id));
    await recordAudit(tx, {
      actorId,
      action: "block.delete",
      entityType: "block",
      entityId: block.id,
      summary: `Deleted Global Block "${block.name}" (CTA is now a per-page section)`,
    });
    return block.id;
  });
}

async function main() {
  const dryRun = arg("dry-run") === "true";
  const defaults = getSectionDefaults(CTA_TYPE);
  parseSectionContent(CTA_TYPE, defaults.content);

  const allPages = await db()
    .select({ id: pages.id, slug: pages.slug, lockVersion: pages.lockVersion, dirty: pages.hasUnpublishedChanges })
    .from(pages)
    .orderBy(asc(pages.slug));

  console.log(`${dryRun ? "[dry run] " : ""}${allPages.length} pages\n`);

  if (dryRun) {
    for (const page of allPages) {
      const sections = await db()
        .select()
        .from(pageSections)
        .where(eq(pageSections.pageId, page.id))
        .orderBy(asc(pageSections.position));
      const note = page.dirty ? "  (publishes pending draft edits too)" : "";
      console.log(`  ${slugToPath(page.slug).padEnd(42)} ${describe(planFor(sections, defaults))}; publish${note}`);
    }
    const [block] = await db().select({ name: globalBlocks.name }).from(globalBlocks).where(eq(globalBlocks.key, BLOCK_KEY));
    console.log(`\n  Global Block "${BLOCK_KEY}": ${block ? "delete" : "not found, nothing to delete"}`);
    return;
  }

  const actorId = await superAdminId();
  const failed: string[] = [];
  for (const page of allPages) {
    try {
      const lockVersion = await applyToPage(page.id, page.lockVersion, actorId);
      const outcome = await publishPage(
        { pageId: page.id, lockVersion, note: "CTA moved from site layout into the page" },
        actorId,
      );
      console.log(`  ok    ${slugToPath(outcome.slug).padEnd(42)} v${outcome.version}`);
    } catch (err) {
      failed.push(page.slug);
      const detail = err instanceof Error && "fieldErrors" in err ? JSON.stringify(err.fieldErrors) : String(err);
      console.log(`  FAIL  ${slugToPath(page.slug).padEnd(42)} ${detail}`);
    }
  }

  const deletedBlockId = await deleteCtaBlock(actorId);
  console.log(deletedBlockId ? `\nDeleted Global Block "${BLOCK_KEY}".` : `\nGlobal Block "${BLOCK_KEY}" not found.`);

  await purgeSiteCache([
    PAGES_LIST_TAG,
    ...allPages.map((p) => pageTag(p.slug)),
    ...(deletedBlockId ? [blockTag(deletedBlockId)] : []),
  ]);

  if (failed.length) throw new Error(`${failed.length} page(s) failed: ${failed.join(", ")}. Fix them in the editor and re-run.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
