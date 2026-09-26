import "server-only";
import { and, asc, desc, eq, gt, lt } from "drizzle-orm";
import type { DbOrTx } from "@/server/db/client";
import { pageSections, type PageSectionRow } from "@/server/db/schema";
import { errors } from "@/server/errors";

export const sectionsRepo = {
  /** Ordered by fractional key: a single index range scan on (page_id, position). */
  async listByPage(conn: DbOrTx, pageId: string): Promise<PageSectionRow[]> {
    return conn
      .select()
      .from(pageSections)
      .where(eq(pageSections.pageId, pageId))
      .orderBy(asc(pageSections.position));
  },

  async findById(conn: DbOrTx, id: string): Promise<PageSectionRow | null> {
    const [row] = await conn.select().from(pageSections).where(eq(pageSections.id, id));
    return row ?? null;
  },

  async findInPage(conn: DbOrTx, pageId: string, id: string): Promise<PageSectionRow> {
    const [row] = await conn
      .select()
      .from(pageSections)
      .where(and(eq(pageSections.id, id), eq(pageSections.pageId, pageId)));
    if (!row) throw errors.notFound("Section");
    return row;
  },

  async lastPosition(conn: DbOrTx, pageId: string): Promise<string | null> {
    const [row] = await conn
      .select({ position: pageSections.position })
      .from(pageSections)
      .where(eq(pageSections.pageId, pageId))
      .orderBy(desc(pageSections.position))
      .limit(1);
    return row?.position ?? null;
  },

  async firstPosition(conn: DbOrTx, pageId: string): Promise<string | null> {
    const [row] = await conn
      .select({ position: pageSections.position })
      .from(pageSections)
      .where(eq(pageSections.pageId, pageId))
      .orderBy(asc(pageSections.position))
      .limit(1);
    return row?.position ?? null;
  },

  async nextPosition(conn: DbOrTx, pageId: string, after: string): Promise<string | null> {
    const [row] = await conn
      .select({ position: pageSections.position })
      .from(pageSections)
      .where(and(eq(pageSections.pageId, pageId), gt(pageSections.position, after)))
      .orderBy(asc(pageSections.position))
      .limit(1);
    return row?.position ?? null;
  },

  async prevPosition(conn: DbOrTx, pageId: string, before: string): Promise<string | null> {
    const [row] = await conn
      .select({ position: pageSections.position })
      .from(pageSections)
      .where(and(eq(pageSections.pageId, pageId), lt(pageSections.position, before)))
      .orderBy(desc(pageSections.position))
      .limit(1);
    return row?.position ?? null;
  },
};
