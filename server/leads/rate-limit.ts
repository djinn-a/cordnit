import "server-only";
import { lt, sql } from "drizzle-orm";
import { db } from "@/server/db/client";
import { leadRateLimits } from "@/server/db/schema";
import type { LeadType } from "@/lib/leads/schema";

export type RateLimitWindow = { name: string; windowMs: number; max: number };

export const LEAD_RATE_LIMITS: RateLimitWindow[] = [
  { name: "10m", windowMs: 10 * 60 * 1000, max: 5 },
  { name: "1d", windowMs: 24 * 60 * 60 * 1000, max: 20 },
];

const CLEANUP_PROBABILITY = 0.02;
const RETENTION_MS = 2 * 24 * 60 * 60 * 1000;

export type RateLimitResult = { allowed: true } | { allowed: false; retryAfterSeconds: number };

/**
 * Fixed-window counters in Postgres: one atomic upsert per window, so concurrent
 * serverless instances share the same budget without an external store.
 */
export async function consumeLeadRateLimit(
  ipHash: string,
  type: LeadType,
  now = Date.now(),
): Promise<RateLimitResult> {
  let retryAfterSeconds = 0;

  for (const window of LEAD_RATE_LIMITS) {
    const windowStart = new Date(Math.floor(now / window.windowMs) * window.windowMs);
    const key = `${type}:${window.name}:${ipHash}`;
    const [row] = await db()
      .insert(leadRateLimits)
      .values({ key, windowStart, count: 1 })
      .onConflictDoUpdate({
        target: [leadRateLimits.key, leadRateLimits.windowStart],
        set: { count: sql`${leadRateLimits.count} + 1` },
      })
      .returning({ count: leadRateLimits.count });

    if (row.count > window.max) {
      const resetsAt = windowStart.getTime() + window.windowMs;
      retryAfterSeconds = Math.max(retryAfterSeconds, Math.ceil((resetsAt - now) / 1000));
    }
  }

  if (Math.random() < CLEANUP_PROBABILITY) {
    await db()
      .delete(leadRateLimits)
      .where(lt(leadRateLimits.windowStart, new Date(now - RETENTION_MS)));
  }

  return retryAfterSeconds > 0 ? { allowed: false, retryAfterSeconds } : { allowed: true };
}
