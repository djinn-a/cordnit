/**
 * One-off: refreshes seeded SEO titles/descriptions and creates the site SEO settings row.
 * Never overwrites a value an editor has changed (see `planSeoCopy`). Pages with unpublished
 * draft edits get the new copy in their draft only, so nobody's work is published early.
 *
 *   npm run cms:backfill-seo -- --dry-run   # print the plan, write nothing
 *   npm run cms:backfill-seo                # apply, publish clean pages, purge cache
 */
import { asc, eq } from "drizzle-orm";
import { PAGES_LIST_TAG, SITE_SETTINGS_TAG, pageTag, slugToPath } from "@/lib/cms/document";
import { DEFAULT_SITE_SEO } from "@/lib/seo/site";
import { recordAudit } from "@/server/cms/audit";
import { touchPage } from "@/server/cms/locking";
import { publishPage } from "@/server/cms/services/publish.service";
import { db } from "@/server/db/client";
import { pages, siteSettings } from "@/server/db/schema";
import { arg, purgeSiteCache, superAdminId } from "./_lib";
import { SEO_COPY, planSeoCopy, type SeoFieldChange } from "./seo-copy";

function describe(changes: SeoFieldChange[]): string {
  return changes.length ? changes.map((c) => c.field).join(" + ") : "up to date (or edited by hand)";
}

async function applyToPage(pageId: string, lockVersion: number, changes: SeoFieldChange[], actorId: string) {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, pageId, lockVersion, actorId);
    const seo = { ...page.seo };
    for (const c of changes) seo[c.field] = c.to;
    await tx.update(pages).set({ seo }).where(eq(pages.id, page.id));
    await recordAudit(tx, {
      actorId,
      action: "page.update_meta",
      entityType: "page",
      entityId: page.id,
      summary: `Refreshed SEO ${describe(changes)} of ${slugToPath(page.slug)}`,
    });
    return page.lockVersion;
  });
}

async function ensureSiteSettings(dryRun: boolean): Promise<boolean> {
  const rows = await db()
    .select({ seo: siteSettings.seo })
    .from(siteSettings)
    .where(eq(siteSettings.id, "global"))
    .catch((err: unknown) => {
      throw new Error("cms.site_settings is missing. Run `npm run db:migrate` first.", { cause: err });
    });
  const [row] = rows;
  const empty = !row || Object.keys(row.seo ?? {}).length === 0;
  console.log(`\n  Site SEO settings: ${empty ? "seed from code defaults" : "already configured, leave as is"}`);
  if (!empty || dryRun) return empty;
  await db()
    .insert(siteSettings)
    .values({ id: "global", seo: DEFAULT_SITE_SEO })
    .onConflictDoUpdate({ target: siteSettings.id, set: { seo: DEFAULT_SITE_SEO } });
  return true;
}

async function main() {
  const dryRun = arg("dry-run") === "true";
  const allPages = await db()
    .select({ id: pages.id, slug: pages.slug, seo: pages.seo, lockVersion: pages.lockVersion, dirty: pages.hasUnpublishedChanges, status: pages.status })
    .from(pages)
    .orderBy(asc(pages.slug));

  const plans = allPages
    .map((p) => ({ page: p, changes: SEO_COPY[p.slug] ? planSeoCopy(p.seo, SEO_COPY[p.slug]) : [] }))
    .filter((x) => SEO_COPY[x.page.slug]);

  console.log(`${dryRun ? "[dry run] " : ""}${plans.length} seeded pages\n`);
  for (const { page, changes } of plans) {
    const publish = changes.length && page.status === "published" ? (page.dirty ? "; draft only (unpublished edits pending)" : "; publish") : "";
    console.log(`  ${slugToPath(page.slug).padEnd(42)} ${describe(changes)}${publish}`);
  }

  if (dryRun) {
    await ensureSiteSettings(true);
    return;
  }

  const actorId = await superAdminId();
  const failed: string[] = [];
  const purged: string[] = [];
  for (const { page, changes } of plans) {
    if (!changes.length) continue;
    try {
      const lockVersion = await applyToPage(page.id, page.lockVersion, changes, actorId);
      if (page.status === "published" && !page.dirty) {
        const outcome = await publishPage({ pageId: page.id, lockVersion, note: "SEO copy refresh" }, actorId);
        purged.push(outcome.slug);
        console.log(`  ok    ${slugToPath(outcome.slug).padEnd(42)} v${outcome.version}`);
      } else {
        console.log(`  draft ${slugToPath(page.slug).padEnd(42)} publish from the editor when ready`);
      }
    } catch (err) {
      failed.push(page.slug);
      const detail = err instanceof Error && "fieldErrors" in err ? JSON.stringify(err.fieldErrors) : String(err);
      console.log(`  FAIL  ${slugToPath(page.slug).padEnd(42)} ${detail}`);
    }
  }

  const seededSettings = await ensureSiteSettings(false);
  await purgeSiteCache([
    ...(purged.length ? [PAGES_LIST_TAG, ...purged.map(pageTag)] : []),
    ...(seededSettings ? [SITE_SETTINGS_TAG] : []),
  ]);

  if (failed.length) throw new Error(`${failed.length} page(s) failed: ${failed.join(", ")}. Fix them in the editor and re-run.`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
