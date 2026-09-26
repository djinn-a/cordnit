import "server-only";
import { desc, count } from "drizzle-orm";
import { db, type DbOrTx } from "@/server/db/client";
import { auditLog } from "@/server/db/schema";

export type AuditEntry = {
  actorId: string | null;
  action: string;
  entityType: "page" | "section" | "block" | "template" | "redirect" | "auth";
  entityId?: string | null;
  summary?: string;
  diff?: Record<string, unknown>;
};

export async function recordAudit(conn: DbOrTx, entry: AuditEntry): Promise<void> {
  await conn.insert(auditLog).values({
    actorId: entry.actorId,
    action: entry.action,
    entityType: entry.entityType,
    entityId: entry.entityId ?? null,
    summary: entry.summary ?? null,
    diff: entry.diff ?? null,
  });
}

export async function listAudit(page: number, pageSize: number) {
  const safeSize = Math.min(Math.max(pageSize, 1), 100);
  const offset = (Math.max(page, 1) - 1) * safeSize;
  const [rows, [{ total }]] = await Promise.all([
    db().select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(safeSize).offset(offset),
    db().select({ total: count() }).from(auditLog),
  ]);
  return { rows, total: Number(total) };
}
