import "server-only";
import { inArray } from "drizzle-orm";
import type { InlineSectionNode, PublishedPageDocument, SectionProps } from "@/lib/cms/document";
import { mergeSectionProps } from "@/lib/cms/registry/props";
import { db } from "@/server/db/client";
import { globalBlocks } from "@/server/db/schema";
import { buildDocument, inlineNodes } from "../document-builder";
import { pagesRepo } from "../repositories/pages.repo";
import { sectionsRepo } from "../repositories/sections.repo";

/** Uncached draft render (admin-only): shows unpublished page and block edits. */
export async function getDraftDocument(
  pageId: string,
): Promise<{ doc: PublishedPageDocument; sections: InlineSectionNode[] } | null> {
  const conn = db();
  const page = await pagesRepo.findById(conn, pageId);
  if (!page) return null;
  const sections = await sectionsRepo.listByPage(conn, page.id);
  const blockIds = [...new Set(sections.flatMap((s) => (s.globalBlockId ? [s.globalBlockId] : [])))];
  const blocks = blockIds.length
    ? await conn.select().from(globalBlocks).where(inArray(globalBlocks.id, blockIds))
    : [];
  const blockProps = new Map<string, SectionProps>(
    blocks.map((b) => [b.id, mergeSectionProps(b.systemProps, b.content)]),
  );
  const doc = buildDocument(
    page,
    sections,
    { version: page.publishedVersion ?? 0, publishedAt: page.updatedAt },
    (id) => blockProps.get(id),
  );
  return { doc, sections: inlineNodes(doc.sections) };
}
