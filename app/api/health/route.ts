import { sql } from "drizzle-orm";
import { connection, NextResponse } from "next/server";
import { db } from "@/server/db/client";
import { logger } from "@/server/logger";

/** Liveness + database readiness for uptime checks and load balancers. */
export async function GET() {
  await connection();
  const started = performance.now();
  try {
    await db().execute(sql`select 1`);
    return NextResponse.json(
      { ok: true, data: { db: "up", latencyMs: Math.round(performance.now() - started) } },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    logger.error("health.db failed", { err });
    return NextResponse.json(
      { ok: false, error: { code: "INTERNAL", message: "Database unavailable." } },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
