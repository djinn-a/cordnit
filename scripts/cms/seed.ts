/**
 * Imports the 28 marketing pages from server/db/seed/snapshot.json and publishes v1.
 *
 *   npm run cms:seed                 # create missing pages only (idempotent)
 *   npm run cms:seed -- --reset      # delete and re-import every snapshot page
 *   npm run cms:seed -- --only=home,aboutus
 */
import { eq, inArray } from "drizzle-orm";
import { generateNKeysBetween } from "fractional-indexing";
import snapshot from "@/server/db/seed/snapshot.json";
import {
  PAGES_LIST_TAG,
  PAGE_SHELLS,
  PAGE_SPACINGS,
  REDIRECTS_TAG,
  pageTag,
  type BreadcrumbItem,
  type PageSeo,
} from "@/lib/cms/document";
import { splitSectionProps } from "@/lib/cms/registry/props";
import { isSectionType } from "@/lib/cms/types";
import { recordAudit } from "@/server/cms/audit";
import { publishPage } from "@/server/cms/services/publish.service";
import { parseSectionContent } from "@/server/cms/validation";
import { db } from "@/server/db/client";
import { pageSections, pages } from "@/server/db/schema";
import { arg, purgeSiteCache, superAdminId } from "./_lib";

type SnapshotSection = { key: string; type: string; props: Record<string, unknown> };
type SnapshotPage = {
  slug: string;
  title: string;
  shell: string;
  spacing: string;
  seo: PageSeo;
  breadcrumbs: BreadcrumbItem[];
  sections: SnapshotSection[];
};

const oneOf = <T extends string>(list: readonly T[], value: string, fallback: T): T =>
  (list as readonly string[]).includes(value) ? (value as T) : fallback;

async function seedPage(page: SnapshotPage, actorId: string) {
  const prepared = page.sections.map((s, index) => {
    if (!isSectionType(s.type)) throw new Error(`/${page.slug}: unknown section type "${s.type}"`);
    const { content, systemProps } = splitSectionProps(s.props);
    try {
      parseSectionContent(s.type, content);
    } catch (err) {
      const detail = err instanceof Error && "fieldErrors" in err ? JSON.stringify(err.fieldErrors) : String(err);
      throw new Error(`/${page.slug} section #${index + 1} (${s.type}) fails its schema: ${detail}`);
    }
    return { type: s.type, content, systemProps };
  });

  const created = await db().transaction(async (tx) => {
    const [row] = await tx
      .insert(pages)
      .values({
        slug: page.slug,
        title: page.title,
        shell: oneOf(PAGE_SHELLS, page.shell, "default"),
        spacing: oneOf(PAGE_SPACINGS, page.spacing, "default"),
        seo: page.seo ?? {},
        breadcrumbs: page.breadcrumbs ?? [],
        createdBy: actorId,
        updatedBy: actorId,
      })
      .returning();
    const keys = generateNKeysBetween(null, null, prepared.length);
    if (prepared.length > 0) {
      await tx.insert(pageSections).values(
        prepared.map((s, i) => ({ pageId: row.id, position: keys[i], ...s })),
      );
    }
    await recordAudit(tx, {
      actorId,
      action: "page.create",
      entityType: "page",
      entityId: row.id,
      summary: `Imported "${row.title}" (/${row.slug}) from the static site`,
    });
    return row;
  });

  const outcome = await publishPage(
    { pageId: created.id, lockVersion: created.lockVersion, note: "Initial import from the static site" },
    actorId,
  );
  return { slug: outcome.slug, sections: prepared.length, version: outcome.version };
}

async function main() {
  const reset = arg("reset") === "true";
  const only = arg("only")?.split(",").map((s) => s.trim()).filter(Boolean);
  const all = (snapshot as { pages: SnapshotPage[] }).pages;
  const targets = only?.length ? all.filter((p) => only.includes(p.slug)) : all;
  if (targets.length === 0) throw new Error("No snapshot pages match --only.");

  const actorId = await superAdminId();
  const slugs = targets.map((p) => p.slug);

  if (reset) {
    const removed = await db().delete(pages).where(inArray(pages.slug, slugs)).returning({ slug: pages.slug });
    console.log(`Reset: removed ${removed.length} existing pages.`);
  }

  let createdCount = 0;
  for (const page of targets) {
    const [existing] = await db().select({ id: pages.id }).from(pages).where(eq(pages.slug, page.slug));
    if (existing) {
      console.log(`  skip  /${page.slug} (exists)`);
      continue;
    }
    const result = await seedPage(page, actorId);
    createdCount++;
    console.log(`  ok    /${result.slug}  ${result.sections} sections  v${result.version}`);
  }

  console.log(`\nSeeded ${createdCount} of ${targets.length} pages.`);
  await purgeSiteCache([PAGES_LIST_TAG, REDIRECTS_TAG, ...slugs.map(pageTag)]);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  });
