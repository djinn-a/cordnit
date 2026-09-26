import "server-only";
import { desc, eq } from "drizzle-orm";
import { generateNKeysBetween } from "fractional-indexing";
import type { z } from "zod";
import { slugToPath, type PageStatus } from "@/lib/cms/document";
import type { createPageSchema, pageRefSchema, updatePageMetaSchema } from "@/lib/cms/inputs";
import { db } from "@/server/db/client";
import {
  globalBlocks,
  pageSections,
  pageVersions,
  pages,
  publishedPages,
  templates,
  type SectionSource,
} from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";
import { touchPage } from "../locking";
import { pagesRepo } from "../repositories/pages.repo";
import { sectionsRepo } from "../repositories/sections.repo";

export async function listPages(filter: { search?: string; status?: PageStatus }) {
  return pagesRepo.list(db(), filter);
}

export async function getPageEditorData(pageId: string) {
  const conn = db();
  const page = await pagesRepo.getById(conn, pageId);
  const [sections, versions, blocks, live] = await Promise.all([
    sectionsRepo.listByPage(conn, pageId),
    conn
      .select({
        version: pageVersions.version,
        note: pageVersions.note,
        createdAt: pageVersions.createdAt,
      })
      .from(pageVersions)
      .where(eq(pageVersions.pageId, pageId))
      .orderBy(desc(pageVersions.version))
      .limit(50),
    conn
      .select({
        id: globalBlocks.id,
        key: globalBlocks.key,
        name: globalBlocks.name,
        type: globalBlocks.type,
        content: globalBlocks.content,
        publishedVersion: globalBlocks.publishedVersion,
        hasUnpublishedChanges: globalBlocks.hasUnpublishedChanges,
      })
      .from(globalBlocks)
      .orderBy(globalBlocks.name),
    conn
      .select({ slug: publishedPages.slug, version: publishedPages.version })
      .from(publishedPages)
      .where(eq(publishedPages.pageId, pageId)),
  ]);
  return { page, sections, versions, blocks, liveSlug: live[0]?.slug ?? null };
}

async function sourceSections(
  source: z.output<typeof createPageSchema>["source"],
): Promise<{ sections: SectionSource[]; templateId: string | null; shell?: string; spacing?: string }> {
  const conn = db();
  if (source.kind === "blank") return { sections: [], templateId: null };
  if (source.kind === "template") {
    const [tpl] = await conn.select().from(templates).where(eq(templates.id, source.templateId));
    if (!tpl) throw errors.notFound("Layout");
    return { sections: tpl.sections, templateId: tpl.id, shell: tpl.shell, spacing: tpl.spacing };
  }
  const original = await pagesRepo.getById(conn, source.pageId);
  const rows = await sectionsRepo.listByPage(conn, original.id);
  return {
    sections: rows.map((s) => ({
      type: s.type,
      label: s.label,
      content: s.content,
      systemProps: s.systemProps,
      globalBlockId: s.globalBlockId,
      isHidden: s.isHidden,
    })),
    templateId: original.templateId,
    shell: original.shell,
    spacing: original.spacing,
  };
}

export async function createPage(input: z.output<typeof createPageSchema>, actorId: string) {
  const origin = await sourceSections(input.source);
  return db().transaction(async (tx) => {
    const [page] = await tx
      .insert(pages)
      .values({
        title: input.title,
        slug: input.slug,
        shell: origin.shell === "contact" ? "contact" : "default",
        spacing:
          origin.spacing === "compact" || origin.spacing === "compact-top" ? origin.spacing : "default",
        seo: {},
        templateId: origin.templateId,
        createdBy: actorId,
        updatedBy: actorId,
      })
      .returning();

    if (origin.sections.length > 0) {
      const keys = generateNKeysBetween(null, null, origin.sections.length);
      await tx.insert(pageSections).values(
        origin.sections.map((s, i) => ({
          pageId: page.id,
          type: s.type,
          label: s.label ?? null,
          position: keys[i],
          content: s.content ?? {},
          systemProps: s.systemProps ?? {},
          globalBlockId: s.globalBlockId ?? null,
          isHidden: s.isHidden ?? false,
        })),
      );
    }

    await recordAudit(tx, {
      actorId,
      action: "page.create",
      entityType: "page",
      entityId: page.id,
      summary: `Created "${page.title}" (${slugToPath(page.slug)}) from ${input.source.kind}`,
    });
    return page;
  });
}

export async function updatePageMeta(input: z.output<typeof updatePageMetaSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const before = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const [page] = await tx
      .update(pages)
      .set({
        title: input.title,
        slug: input.slug,
        shell: input.shell,
        spacing: input.spacing,
        seo: input.seo,
        breadcrumbs: input.breadcrumbs,
      })
      .where(eq(pages.id, input.pageId))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "page.update_meta",
      entityType: "page",
      entityId: page.id,
      summary: before.slug !== page.slug ? `Slug ${slugToPath(before.slug)} -> ${slugToPath(page.slug)} (live after publish)` : `Updated settings of "${page.title}"`,
    });
    return page;
  });
}

export async function deletePage(input: z.output<typeof pageRefSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const [live] = await tx
      .select({ slug: publishedPages.slug })
      .from(publishedPages)
      .where(eq(publishedPages.pageId, page.id));
    await tx.delete(pages).where(eq(pages.id, page.id));
    await recordAudit(tx, {
      actorId,
      action: "page.delete",
      entityType: "page",
      entityId: page.id,
      summary: `Deleted "${page.title}" (${slugToPath(page.slug)})`,
    });
    return { slug: page.slug, liveSlug: live?.slug ?? null };
  });
}
