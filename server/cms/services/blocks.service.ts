import "server-only";
import { and, count, desc, eq, sql } from "drizzle-orm";
import type { z } from "zod";
import { slugToPath } from "@/lib/cms/document";
import type { blockRefSchema, convertToBlockSchema, updateBlockSchema } from "@/lib/cms/inputs";
import { mergeSectionProps } from "@/lib/cms/registry/props";
import { db, type Transaction } from "@/server/db/client";
import { globalBlockVersions, globalBlocks, pageSections, pages, type GlobalBlockRow } from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";
import { touchPage } from "../locking";
import { sectionsRepo } from "../repositories/sections.repo";
import { parseSectionContent } from "../validation";

export async function listBlocks() {
  const usage = db()
    .select({ blockId: pageSections.globalBlockId, n: count().as("n") })
    .from(pageSections)
    .where(sql`${pageSections.globalBlockId} is not null`)
    .groupBy(pageSections.globalBlockId)
    .as("usage");
  const rows = await db()
    .select({
      id: globalBlocks.id,
      key: globalBlocks.key,
      name: globalBlocks.name,
      type: globalBlocks.type,
      publishedVersion: globalBlocks.publishedVersion,
      hasUnpublishedChanges: globalBlocks.hasUnpublishedChanges,
      updatedAt: globalBlocks.updatedAt,
      usageCount: usage.n,
    })
    .from(globalBlocks)
    .leftJoin(usage, eq(usage.blockId, globalBlocks.id))
    .orderBy(globalBlocks.name);
  return rows.map((r) => ({ ...r, usageCount: Number(r.usageCount ?? 0) }));
}

export async function getBlockEditorData(blockId: string) {
  const conn = db();
  const [block] = await conn.select().from(globalBlocks).where(eq(globalBlocks.id, blockId));
  if (!block) throw errors.notFound("Global block");
  const [usages, versions] = await Promise.all([
    conn
      .selectDistinct({ pageId: pages.id, title: pages.title, slug: pages.slug })
      .from(pageSections)
      .innerJoin(pages, eq(pages.id, pageSections.pageId))
      .where(eq(pageSections.globalBlockId, blockId)),
    conn
      .select({ version: globalBlockVersions.version, createdAt: globalBlockVersions.createdAt, note: globalBlockVersions.note })
      .from(globalBlockVersions)
      .where(eq(globalBlockVersions.blockId, blockId))
      .orderBy(desc(globalBlockVersions.version))
      .limit(30),
  ]);
  return { block, usages, versions };
}

async function publishBlockTx(tx: Transaction, block: GlobalBlockRow, actorId: string, note?: string) {
  const content = parseSectionContent(block.type, block.content);
  const version = (block.publishedVersion ?? 0) + 1;
  await tx.insert(globalBlockVersions).values({
    blockId: block.id,
    version,
    content,
    systemProps: block.systemProps,
    note: note ?? null,
    createdBy: actorId,
  });
  const [published] = await tx
    .update(globalBlocks)
    .set({
      publishedProps: mergeSectionProps(block.systemProps, content),
      publishedVersion: version,
      publishedAt: new Date(),
      hasUnpublishedChanges: false,
      lockVersion: sql`${globalBlocks.lockVersion} + 1`,
      updatedBy: actorId,
    })
    .where(eq(globalBlocks.id, block.id))
    .returning();
  return published;
}

/** Promotes an inline section to a reusable, already-published Global Block. */
export async function convertSectionToBlock(input: z.output<typeof convertToBlockSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const page = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const section = await sectionsRepo.findInPage(tx, page.id, input.sectionId);
    if (section.globalBlockId) throw errors.validation("This section is already a Global Block.");
    const [created] = await tx
      .insert(globalBlocks)
      .values({
        key: input.key,
        name: input.name,
        type: section.type,
        content: section.content,
        systemProps: section.systemProps,
        updatedBy: actorId,
      })
      .returning();
    const block = await publishBlockTx(tx, created, actorId, "Created from page section");
    await tx
      .update(pageSections)
      .set({ globalBlockId: block.id, content: {}, systemProps: {}, label: block.name })
      .where(eq(pageSections.id, section.id));
    await recordAudit(tx, {
      actorId,
      action: "block.create",
      entityType: "block",
      entityId: block.id,
      summary: `Created Global Block "${block.name}" from ${slugToPath(page.slug)}`,
    });
    return { block, lockVersion: page.lockVersion };
  });
}

async function touchBlock(tx: Transaction, blockId: string, lockVersion: number) {
  const [row] = await tx
    .update(globalBlocks)
    .set({ lockVersion: sql`${globalBlocks.lockVersion} + 1` })
    .where(and(eq(globalBlocks.id, blockId), eq(globalBlocks.lockVersion, lockVersion)))
    .returning();
  if (row) return row;
  const [exists] = await tx.select({ id: globalBlocks.id }).from(globalBlocks).where(eq(globalBlocks.id, blockId));
  if (!exists) throw errors.notFound("Global block");
  throw errors.staleWrite();
}

export async function updateBlock(input: z.output<typeof updateBlockSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const current = await touchBlock(tx, input.blockId, input.lockVersion);
    const content = parseSectionContent(current.type, input.content);
    const [block] = await tx
      .update(globalBlocks)
      .set({ name: input.name, content, hasUnpublishedChanges: true, updatedBy: actorId })
      .where(eq(globalBlocks.id, current.id))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "block.update",
      entityType: "block",
      entityId: block.id,
      summary: `Edited Global Block "${block.name}"`,
    });
    return block;
  });
}

export async function publishBlock(input: z.output<typeof blockRefSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const current = await touchBlock(tx, input.blockId, input.lockVersion);
    const block = await publishBlockTx(tx, current, actorId);
    await recordAudit(tx, {
      actorId,
      action: "block.publish",
      entityType: "block",
      entityId: block.id,
      summary: `Published Global Block "${block.name}" v${block.publishedVersion}`,
    });
    return block;
  });
}

export async function deleteBlock(input: z.output<typeof blockRefSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const current = await touchBlock(tx, input.blockId, input.lockVersion);
    const used = await tx
      .selectDistinct({ slug: pages.slug })
      .from(pageSections)
      .innerJoin(pages, eq(pages.id, pageSections.pageId))
      .where(eq(pageSections.globalBlockId, current.id));
    if (used.length > 0) {
      throw errors.conflict(
        `"${current.name}" is used on ${used.map((u) => slugToPath(u.slug)).join(", ")}. Detach or remove it there first.`,
      );
    }
    await tx.delete(globalBlocks).where(eq(globalBlocks.id, current.id));
    await recordAudit(tx, {
      actorId,
      action: "block.delete",
      entityType: "block",
      entityId: current.id,
      summary: `Deleted Global Block "${current.name}"`,
    });
    return { blockId: current.id };
  });
}
