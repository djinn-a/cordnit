import "server-only";
import { and, eq, sql } from "drizzle-orm";
import type { Transaction } from "@/server/db/client";
import { pages, type PageRow } from "@/server/db/schema";
import { errors } from "@/server/errors";

/**
 * Optimistic lock + row lock in one statement: bumps the page's lock_version
 * only if the caller saw the latest version. Every draft mutation starts here,
 * which also serialises concurrent writers on the same page.
 */
export async function touchPage(
  tx: Transaction,
  pageId: string,
  expectedLockVersion: number,
  actorId: string,
): Promise<PageRow> {
  const [row] = await tx
    .update(pages)
    .set({
      lockVersion: sql`${pages.lockVersion} + 1`,
      hasUnpublishedChanges: true,
      updatedBy: actorId,
    })
    .where(and(eq(pages.id, pageId), eq(pages.lockVersion, expectedLockVersion)))
    .returning();
  if (row) return row;

  const [exists] = await tx.select({ id: pages.id }).from(pages).where(eq(pages.id, pageId));
  if (!exists) throw errors.notFound("Page");
  throw errors.staleWrite();
}
