import "server-only";
import { asc, eq } from "drizzle-orm";
import type { z } from "zod";
import { slugToPath } from "@/lib/cms/document";
import type { saveTemplateSchema } from "@/lib/cms/inputs";
import { db } from "@/server/db/client";
import { templates } from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";
import { toSectionSource } from "../document-builder";
import { pagesRepo } from "../repositories/pages.repo";
import { sectionsRepo } from "../repositories/sections.repo";

export async function listTemplates() {
  const rows = await db().select().from(templates).orderBy(asc(templates.name));
  return rows.map((t) => ({
    id: t.id,
    key: t.key,
    name: t.name,
    description: t.description,
    shell: t.shell,
    spacing: t.spacing,
    sectionTypes: t.sections.map((s) => s.type),
    updatedAt: t.updatedAt,
  }));
}

/** "Save as layout": captures a page's section structure and copy as a reusable starting point. */
export async function saveTemplateFromPage(input: z.output<typeof saveTemplateSchema>, actorId: string) {
  const conn = db();
  const page = await pagesRepo.getById(conn, input.pageId);
  const sections = await sectionsRepo.listByPage(conn, page.id);
  return conn.transaction(async (tx) => {
    const [tpl] = await tx
      .insert(templates)
      .values({
        key: input.key,
        name: input.name,
        description: input.description ?? null,
        shell: page.shell,
        spacing: page.spacing,
        sections: toSectionSource(sections),
      })
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "template.create",
      entityType: "template",
      entityId: tpl.id,
      summary: `Saved layout "${tpl.name}" from ${slugToPath(page.slug)}`,
    });
    return tpl;
  });
}

export async function deleteTemplate(templateId: string, actorId: string) {
  return db().transaction(async (tx) => {
    const [tpl] = await tx.delete(templates).where(eq(templates.id, templateId)).returning();
    if (!tpl) throw errors.notFound("Layout");
    await recordAudit(tx, {
      actorId,
      action: "template.delete",
      entityType: "template",
      entityId: tpl.id,
      summary: `Deleted layout "${tpl.name}"`,
    });
    return { templateId: tpl.id };
  });
}
