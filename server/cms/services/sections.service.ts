import "server-only";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import type {
  addSectionSchema,
  moveSectionSchema,
  sectionRefSchema,
  toggleSectionSchema,
  updateSectionSchema,
} from "@/lib/cms/inputs";
import { slugToPath } from "@/lib/cms/document";
import { SECTION_CATALOG } from "@/lib/cms/registry";
import { isSectionType } from "@/lib/cms/types";
import { db, type Transaction } from "@/server/db/client";
import { globalBlocks, pageSections, type PageSectionRow } from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";
import { touchPage } from "../locking";
import { keyBetween } from "../positions";
import { sectionsRepo } from "../repositories/sections.repo";
import { getSectionDefaults } from "../section-defaults";
import { parseSectionContent } from "../validation";

type Mutation<T> = { lockVersion: number } & T;

async function positionAfter(tx: Transaction, pageId: string, afterSectionId: string | null | undefined) {
  if (afterSectionId === undefined) {
    return keyBetween(await sectionsRepo.lastPosition(tx, pageId), null);
  }
  if (afterSectionId === null) {
    return keyBetween(null, await sectionsRepo.firstPosition(tx, pageId));
  }
  const anchor = await sectionsRepo.findInPage(tx, pageId, afterSectionId);
  return keyBetween(anchor.position, await sectionsRepo.nextPosition(tx, pageId, anchor.position));
}

export async function addSection(
  input: z.output<typeof addSectionSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const position = await positionAfter(tx, page.id, input.afterSectionId);

    let values: typeof pageSections.$inferInsert;
    if (input.source.kind === "type") {
      const defaults = getSectionDefaults(input.source.type);
      values = {
        pageId: page.id,
        type: input.source.type,
        position,
        content: defaults.content,
        systemProps: defaults.systemProps,
      };
    } else if (input.source.kind === "block") {
      const [block] = await tx.select().from(globalBlocks).where(eq(globalBlocks.id, input.source.blockId));
      if (!block) throw errors.notFound("Global block");
      values = { pageId: page.id, type: block.type, position, globalBlockId: block.id, label: block.name };
    } else {
      const original = await sectionsRepo.findById(tx, input.source.sectionId);
      if (!original) throw errors.notFound("Section to copy");
      values = {
        pageId: page.id,
        type: original.type,
        label: original.label,
        position,
        content: original.content,
        systemProps: original.systemProps,
        globalBlockId: original.globalBlockId,
      };
    }

    const [section] = await tx.insert(pageSections).values(values).returning();
    await recordAudit(tx, {
      actorId,
      action: "section.add",
      entityType: "section",
      entityId: section.id,
      summary: `Added ${isSectionType(section.type) ? SECTION_CATALOG[section.type].label : section.type} to ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}

export async function updateSection(
  input: z.output<typeof updateSectionSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const current = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    if (current.globalBlockId) {
      throw errors.validation("This section is a Global Block. Edit it from Global Blocks, or detach it first.");
    }
    const content = parseSectionContent(current.type, input.content);
    const [section] = await tx
      .update(pageSections)
      .set({ content, ...(input.label !== undefined ? { label: input.label } : {}) })
      .where(eq(pageSections.id, current.id))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "section.update",
      entityType: "section",
      entityId: section.id,
      summary: `Edited ${section.label ?? section.type} on ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}

/** O(1) reorder: only the moved row changes, keyed between its new neighbours. */
export async function moveSection(
  input: z.output<typeof moveSectionSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const current = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    const prev = input.prevId ? await sectionsRepo.findInPage(tx, page.id, input.prevId) : null;
    const next = input.nextId ? await sectionsRepo.findInPage(tx, page.id, input.nextId) : null;
    if (prev?.id === current.id || next?.id === current.id) throw errors.validation("Invalid move.");
    const position = keyBetween(prev?.position ?? null, next?.position ?? null);
    const [section] = await tx
      .update(pageSections)
      .set({ position })
      .where(eq(pageSections.id, current.id))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "section.move",
      entityType: "section",
      entityId: section.id,
      summary: `Reordered ${section.label ?? section.type} on ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}

export async function duplicateSection(
  input: z.output<typeof sectionRefSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const original = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    const position = keyBetween(
      original.position,
      await sectionsRepo.nextPosition(tx, page.id, original.position),
    );
    const [section] = await tx
      .insert(pageSections)
      .values({
        pageId: page.id,
        type: original.type,
        label: original.label ? `${original.label} (copy)` : null,
        position,
        content: original.content,
        systemProps: original.systemProps,
        globalBlockId: original.globalBlockId,
        isHidden: original.isHidden,
      })
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "section.duplicate",
      entityType: "section",
      entityId: section.id,
      summary: `Duplicated ${original.label ?? original.type} on ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}

export async function toggleSection(
  input: z.output<typeof toggleSectionSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    const [section] = await tx
      .update(pageSections)
      .set({ isHidden: input.isHidden })
      .where(eq(pageSections.id, input.sectionId))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: input.isHidden ? "section.hide" : "section.show",
      entityType: "section",
      entityId: section.id,
      summary: `${input.isHidden ? "Hid" : "Showed"} ${section.label ?? section.type} on ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}

export async function deleteSection(
  input: z.output<typeof sectionRefSchema>,
  actorId: string,
): Promise<Mutation<{ sectionId: string }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const section = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    await tx.delete(pageSections).where(eq(pageSections.id, section.id));
    await recordAudit(tx, {
      actorId,
      action: "section.delete",
      entityType: "section",
      entityId: section.id,
      summary: `Removed ${section.label ?? section.type} from ${slugToPath(page.slug)}`,
      diff: { content: section.content },
    });
    return { sectionId: section.id, lockVersion: page.lockVersion };
  });
}

/** Turns a Global Block reference into an independent inline copy. */
export async function detachSection(
  input: z.output<typeof sectionRefSchema>,
  actorId: string,
): Promise<Mutation<{ section: PageSectionRow }>> {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const current = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    if (!current.globalBlockId) throw errors.validation("This section is not linked to a Global Block.");
    const [block] = await tx.select().from(globalBlocks).where(eq(globalBlocks.id, current.globalBlockId));
    if (!block) throw errors.notFound("Global block");
    const [section] = await tx
      .update(pageSections)
      .set({ globalBlockId: null, content: block.content, systemProps: block.systemProps })
      .where(eq(pageSections.id, current.id))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "section.detach",
      entityType: "section",
      entityId: section.id,
      summary: `Detached "${block.name}" on ${slugToPath(page.slug)}`,
    });
    return { section, lockVersion: page.lockVersion };
  });
}
