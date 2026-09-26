import "server-only";
import { and, count, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import type { PageStatus } from "@/lib/cms/document";
import type { DbOrTx } from "@/server/db/client";
import { pageSections, pages, publishedPages, type PageRow } from "@/server/db/schema";
import { errors } from "@/server/errors";

export type PageListItem = Pick<
  PageRow,
  | "id"
  | "slug"
  | "title"
  | "status"
  | "publishedVersion"
  | "hasUnpublishedChanges"
  | "updatedAt"
  | "publishedAt"
  | "shell"
  | "lockVersion"
> & { sectionCount: number; liveSlug: string | null };

function escapeLike(value: string) {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export const pagesRepo = {
  async findById(conn: DbOrTx, id: string): Promise<PageRow | null> {
    const [row] = await conn.select().from(pages).where(eq(pages.id, id));
    return row ?? null;
  },

  async getById(conn: DbOrTx, id: string): Promise<PageRow> {
    const row = await pagesRepo.findById(conn, id);
    if (!row) throw errors.notFound("Page");
    return row;
  },

  async list(conn: DbOrTx, filter: { search?: string; status?: PageStatus }): Promise<PageListItem[]> {
    const where: SQL[] = [];
    if (filter.status) where.push(eq(pages.status, filter.status));
    const term = filter.search?.trim();
    if (term) {
      const like = `%${escapeLike(term)}%`;
      const match = or(ilike(pages.title, like), ilike(pages.slug, like));
      if (match) where.push(match);
    }
    const sectionCounts = conn
      .select({ pageId: pageSections.pageId, n: count().as("n") })
      .from(pageSections)
      .groupBy(pageSections.pageId)
      .as("section_counts");

    const rows = await conn
      .select({
        id: pages.id,
        slug: pages.slug,
        title: pages.title,
        status: pages.status,
        shell: pages.shell,
        lockVersion: pages.lockVersion,
        publishedVersion: pages.publishedVersion,
        hasUnpublishedChanges: pages.hasUnpublishedChanges,
        updatedAt: pages.updatedAt,
        publishedAt: pages.publishedAt,
        sectionCount: sectionCounts.n,
        liveSlug: publishedPages.slug,
      })
      .from(pages)
      .leftJoin(sectionCounts, eq(sectionCounts.pageId, pages.id))
      .leftJoin(publishedPages, eq(publishedPages.pageId, pages.id))
      .where(where.length ? and(...where) : undefined)
      .orderBy(desc(pages.updatedAt));

    return rows.map((r) => ({ ...r, sectionCount: Number(r.sectionCount ?? 0) }));
  },
};
