import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { generateNKeysBetween } from "fractional-indexing";
import type { z } from "zod";
import type { PublishedPageDocument, SectionProps } from "@/lib/cms/document";
import { HOME_SLUG, slugToPath } from "@/lib/cms/document";
import type { pageRefSchema, publishPageSchema, rollbackSchema } from "@/lib/cms/inputs";
import { SECTION_CATALOG } from "@/lib/cms/registry";
import { isSectionType } from "@/lib/cms/types";
import { db, type Transaction } from "@/server/db/client";
import {
  globalBlocks,
  pageSections,
  pageVersions,
  pages,
  publishedPages,
  redirects,
  type PageRow,
} from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";
import { buildDocument, toSectionSource } from "../document-builder";
import { touchPage } from "../locking";
import { sectionsRepo } from "../repositories/sections.repo";
import { checkSectionContent } from "../validation";

export type PublishOutcome = {
  slug: string;
  previousSlug: string | null;
  version: number;
  blockIds: string[];
  lockVersion: number;
};

function blockIdsOf(doc: PublishedPageDocument): string[] {
  return [...new Set(doc.sections.flatMap((s) => ("blockId" in s ? [s.blockId] : [])))];
}

async function writeLive(
  tx: Transaction,
  page: PageRow,
  doc: PublishedPageDocument,
  source: ReturnType<typeof toSectionSource>,
  note: string | undefined,
  actorId: string,
): Promise<{ previousSlug: string | null; blockIds: string[] }> {
  const blockIds = blockIdsOf(doc);
  await tx.insert(pageVersions).values({
    pageId: page.id,
    version: doc.version,
    document: doc,
    source,
    note: note ?? null,
    createdBy: actorId,
  });

  const [previous] = await tx
    .select({ slug: publishedPages.slug })
    .from(publishedPages)
    .where(eq(publishedPages.pageId, page.id));
  const previousSlug = previous && previous.slug !== doc.slug ? previous.slug : null;
  if (previousSlug) {
    await tx.delete(publishedPages).where(eq(publishedPages.pageId, page.id));
    const from = slugToPath(previousSlug);
    const to = slugToPath(doc.slug);
    if (previousSlug !== HOME_SLUG) {
      await tx
        .insert(redirects)
        .values({ fromPath: from, toPath: to, statusCode: 308 })
        .onConflictDoUpdate({ target: redirects.fromPath, set: { toPath: to, statusCode: 308 } });
    }
    // A page now living at a path that used to redirect must win over the redirect.
    await tx.delete(redirects).where(eq(redirects.fromPath, to));
    // Collapse chains: anything pointing at the old path now points at the new one.
    await tx.update(redirects).set({ toPath: to }).where(eq(redirects.toPath, from));
  }

  await tx
    .insert(publishedPages)
    .values({
      slug: doc.slug,
      pageId: page.id,
      document: doc,
      version: doc.version,
      noindex: doc.seo.noindex ?? false,
      blockIds,
      publishedAt: new Date(doc.publishedAt),
    })
    .onConflictDoUpdate({
      target: publishedPages.slug,
      set: {
        pageId: page.id,
        document: doc,
        version: doc.version,
        noindex: doc.seo.noindex ?? false,
        blockIds,
        publishedAt: new Date(doc.publishedAt),
      },
    });

  return { previousSlug, blockIds };
}

export async function publishPage(
  input: z.output<typeof publishPageSchema>,
  actorId: string,
): Promise<PublishOutcome> {
  return db().transaction(async (tx) => {
    const touched = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const sections = await sectionsRepo.listByPage(tx, touched.id);

    const fieldErrors: Record<string, string[]> = {};
    for (const s of sections) {
      if (s.isHidden || s.globalBlockId) continue;
      const check = checkSectionContent(s.type, s.content);
      if (!check.ok) {
        const name = s.label ?? (isSectionType(s.type) ? SECTION_CATALOG[s.type].label : s.type);
        fieldErrors[`section:${s.id}`] = [
          `${name}: ${Object.entries(check.fieldErrors)
            .map(([path, msgs]) => `${path} (${msgs.join(", ")})`)
            .join("; ")}`,
        ];
      }
    }

    const refIds = [...new Set(sections.filter((s) => !s.isHidden && s.globalBlockId).map((s) => s.globalBlockId!))];
    if (refIds.length > 0) {
      const blocks = await tx
        .select({ id: globalBlocks.id, name: globalBlocks.name, publishedVersion: globalBlocks.publishedVersion })
        .from(globalBlocks)
        .where(inArray(globalBlocks.id, refIds));
      for (const b of blocks) {
        if (b.publishedVersion === null) {
          fieldErrors[`block:${b.id}`] = [`Global block "${b.name}" has never been published.`];
        }
      }
    }
    if (Object.keys(fieldErrors).length > 0) {
      throw errors.validation("Fix the highlighted sections before publishing.", fieldErrors);
    }

    const version = (touched.publishedVersion ?? 0) + 1;
    const now = new Date();
    const doc = buildDocument(touched, sections, { version, publishedAt: now });
    const { previousSlug, blockIds } = await writeLive(tx, touched, doc, toSectionSource(sections), input.note, actorId);

    const [page] = await tx
      .update(pages)
      .set({ status: "published", publishedVersion: version, publishedAt: now, hasUnpublishedChanges: false })
      .where(eq(pages.id, touched.id))
      .returning();

    await recordAudit(tx, {
      actorId,
      action: "page.publish",
      entityType: "page",
      entityId: page.id,
      summary: `Published ${slugToPath(page.slug)} v${version}${input.note ? ` - ${input.note}` : ""}`,
    });
    return { slug: page.slug, previousSlug, version, blockIds, lockVersion: page.lockVersion };
  });
}

export async function unpublishPage(input: z.output<typeof pageRefSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    const touched = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const [live] = await tx
      .delete(publishedPages)
      .where(eq(publishedPages.pageId, touched.id))
      .returning({ slug: publishedPages.slug });
    if (!live) throw errors.validation("This page is not live.");
    const [page] = await tx
      .update(pages)
      .set({ status: "draft", hasUnpublishedChanges: true })
      .where(eq(pages.id, touched.id))
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "page.unpublish",
      entityType: "page",
      entityId: page.id,
      summary: `Unpublished ${slugToPath(live.slug)}`,
    });
    return { slug: live.slug, lockVersion: page.lockVersion };
  });
}

/** Re-publishes an old version as a new version (history stays linear). */
export async function rollbackPage(
  input: z.output<typeof rollbackSchema>,
  actorId: string,
): Promise<PublishOutcome> {
  return db().transaction(async (tx) => {
    const touched = await touchPage(tx, input.pageId, input.lockVersion, actorId);
    const [target] = await tx
      .select()
      .from(pageVersions)
      .where(and(eq(pageVersions.pageId, touched.id), eq(pageVersions.version, input.version)));
    if (!target) throw errors.notFound(`Version ${input.version}`);

    const version = (touched.publishedVersion ?? 0) + 1;
    const now = new Date();
    const doc: PublishedPageDocument = {
      ...target.document,
      pageId: touched.id,
      slug: touched.slug,
      version,
      publishedAt: now.toISOString(),
    };
    const source = target.source ?? [];
    const { previousSlug, blockIds } = await writeLive(
      tx,
      touched,
      doc,
      source,
      `Rollback to v${input.version}`,
      actorId,
    );

    if (input.restoreDraft && source.length > 0) {
      // Blocks deleted since that version cannot be restored as references.
      const referenced = [...new Set(source.flatMap((s) => (s.globalBlockId ? [s.globalBlockId] : [])))];
      const existing = referenced.length
        ? new Set(
            (
              await tx.select({ id: globalBlocks.id }).from(globalBlocks).where(inArray(globalBlocks.id, referenced))
            ).map((b) => b.id),
          )
        : new Set<string>();
      await tx.delete(pageSections).where(eq(pageSections.pageId, touched.id));
      const keys = generateNKeysBetween(null, null, source.length);
      await tx.insert(pageSections).values(
        source.map((s, i) => ({
          pageId: touched.id,
          type: s.type,
          label: s.label ?? null,
          position: keys[i],
          content: (s.content ?? {}) as SectionProps,
          systemProps: (s.systemProps ?? {}) as SectionProps,
          globalBlockId: s.globalBlockId && existing.has(s.globalBlockId) ? s.globalBlockId : null,
          isHidden: s.isHidden ?? false,
        })),
      );
    }

    const [page] = await tx
      .update(pages)
      .set({
        status: "published",
        publishedVersion: version,
        publishedAt: now,
        hasUnpublishedChanges: !input.restoreDraft,
        lockVersion: sql`${pages.lockVersion} + 1`,
      })
      .where(eq(pages.id, touched.id))
      .returning();

    await recordAudit(tx, {
      actorId,
      action: "page.rollback",
      entityType: "page",
      entityId: page.id,
      summary: `Rolled ${slugToPath(page.slug)} back to v${input.version} (now v${version})`,
    });
    return { slug: page.slug, previousSlug, version, blockIds, lockVersion: page.lockVersion };
  });
}
