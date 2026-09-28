import "server-only";
import { and, asc, count, desc, eq, gte, ilike, lt, or, sql, type SQL } from "drizzle-orm";
import { z } from "zod";
import { LEAD_TYPES, type LeadSubmission, type LeadType } from "@/lib/leads/schema";
import { db } from "@/server/db/client";
import { leads, type LeadRow } from "@/server/db/schema";
import { recordAudit } from "../audit";

export const LEADS_MAX_PAGE_SIZE = 100;

const dateParam = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional()
  .catch(undefined);

/** Parsed from URL search params; anything malformed falls back to "no filter". */
export const leadFiltersSchema = z.object({
  type: z.enum(LEAD_TYPES).optional().catch(undefined),
  q: z.string().trim().max(200).optional().catch(undefined),
  from: dateParam,
  to: dateParam,
  page: z.coerce.number().int().min(1).max(10_000).default(1).catch(1),
  pageSize: z.coerce.number().int().min(1).max(LEADS_MAX_PAGE_SIZE).default(25).catch(25),
});
export type LeadFilters = z.output<typeof leadFiltersSchema>;

export type LeadMeta = { ipHash: string | null; userAgent: string | null };

/** Returns false when a newsletter address is already subscribed. */
export async function createLead(input: LeadSubmission, meta: LeadMeta): Promise<boolean> {
  const base = {
    type: input.type,
    email: input.email,
    attribution: input.attribution,
    ipHash: meta.ipHash,
    userAgent: meta.userAgent?.slice(0, 300) ?? null,
  };

  if (input.type === "newsletter") {
    const rows = await db()
      .insert(leads)
      .values({ ...base, privacyConsent: input.consent })
      .onConflictDoNothing({ target: leads.email, where: sql`type = 'newsletter'` })
      .returning({ id: leads.id });
    return rows.length > 0;
  }

  await db()
    .insert(leads)
    .values({
      ...base,
      firstName: input.firstName,
      lastName: input.lastName,
      company: input.company,
      jobTitle: input.jobTitle,
      phone: input.phone ?? null,
      message: input.helpDetails,
      interests: input.interests,
      introCall: input.introCall,
      privacyConsent: input.privacy,
      bookingAt: input.bookingDateTime ?? null,
    });
  return true;
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (ch) => `\\${ch}`);
}

/** Dates are interpreted as whole UTC days; `to` is inclusive. */
function whereFor(filters: LeadExportFilters, includeType = true): SQL | undefined {
  const conditions: (SQL | undefined)[] = [];
  if (includeType && filters.type) conditions.push(eq(leads.type, filters.type));
  if (filters.from) conditions.push(gte(leads.createdAt, new Date(`${filters.from}T00:00:00.000Z`)));
  if (filters.to) {
    const end = new Date(`${filters.to}T00:00:00.000Z`);
    end.setUTCDate(end.getUTCDate() + 1);
    conditions.push(lt(leads.createdAt, end));
  }
  if (filters.q) {
    const pattern = `%${escapeLike(filters.q)}%`;
    conditions.push(
      or(
        ilike(leads.email, pattern),
        ilike(leads.firstName, pattern),
        ilike(leads.lastName, pattern),
        ilike(leads.company, pattern),
        ilike(sql`coalesce(${leads.firstName}, '') || ' ' || coalesce(${leads.lastName}, '')`, pattern),
      ),
    );
  }
  const defined = conditions.filter((c): c is SQL => c !== undefined);
  return defined.length ? and(...defined) : undefined;
}

export type LeadListResult = {
  rows: LeadRow[];
  total: number;
  countsByType: Record<LeadType, number>;
};

export async function listLeads(filters: LeadFilters): Promise<LeadListResult> {
  const where = whereFor(filters);
  const offset = (filters.page - 1) * filters.pageSize;

  const [rows, [{ total }], typeCounts] = await Promise.all([
    db()
      .select()
      .from(leads)
      .where(where)
      .orderBy(desc(leads.createdAt), desc(leads.id))
      .limit(filters.pageSize)
      .offset(offset),
    db().select({ total: count() }).from(leads).where(where),
    db()
      .select({ type: leads.type, n: count() })
      .from(leads)
      .where(whereFor(filters, false))
      .groupBy(leads.type),
  ]);

  const countsByType = Object.fromEntries(LEAD_TYPES.map((t) => [t, 0])) as Record<LeadType, number>;
  for (const row of typeCounts) {
    if (row.type in countsByType) countsByType[row.type] = Number(row.n);
  }

  return { rows, total: Number(total), countsByType };
}

export const LEADS_EXPORT_MAX_ROWS = 100_000;

export type LeadExportFilters = Omit<LeadFilters, "page" | "pageSize">;

/** Counts matching rows and records who exported what, before any data leaves the server. */
export async function recordLeadExport(filters: LeadExportFilters, actorId: string): Promise<number> {
  const [{ total }] = await db().select({ total: count() }).from(leads).where(whereFor(filters));
  const rowCount = Math.min(Number(total), LEADS_EXPORT_MAX_ROWS);
  const applied = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined));
  await recordAudit(db(), {
    actorId,
    action: "lead.export",
    entityType: "lead",
    summary: `Exported ${rowCount} lead${rowCount === 1 ? "" : "s"} to CSV`,
    diff: { filters: applied, rowCount },
  });
  return rowCount;
}

/**
 * Batched, oldest-first iteration so exports never hold every lead in memory.
 * Ascending order means leads inserted mid-export land after the cursor and never shift it.
 */
export async function* iterateLeads(
  filters: LeadExportFilters,
  batchSize = 1000,
): AsyncGenerator<LeadRow[]> {
  const where = whereFor(filters);
  for (let offset = 0; offset < LEADS_EXPORT_MAX_ROWS; offset += batchSize) {
    const rows = await db()
      .select()
      .from(leads)
      .where(where)
      .orderBy(asc(leads.createdAt), asc(leads.id))
      .limit(Math.min(batchSize, LEADS_EXPORT_MAX_ROWS - offset))
      .offset(offset);
    if (rows.length === 0) return;
    yield rows;
    if (rows.length < batchSize) return;
  }
}
