import "server-only";
import { asc, eq } from "drizzle-orm";
import type { z } from "zod";
import type { redirectSchema } from "@/lib/cms/inputs";
import { db } from "@/server/db/client";
import { redirects } from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";

export async function listRedirects() {
  return db().select().from(redirects).orderBy(asc(redirects.fromPath));
}

export async function upsertRedirect(input: z.output<typeof redirectSchema>, actorId: string) {
  if (input.fromPath === input.toPath) {
    throw errors.validation("A redirect cannot point to itself.", { toPath: ["Must differ from the source path."] });
  }
  return db().transaction(async (tx) => {
    const [row] = await tx
      .insert(redirects)
      .values(input)
      .onConflictDoUpdate({ target: redirects.fromPath, set: { toPath: input.toPath, statusCode: input.statusCode } })
      .returning();
    await recordAudit(tx, {
      actorId,
      action: "redirect.upsert",
      entityType: "redirect",
      entityId: row.fromPath,
      summary: `${row.fromPath} -> ${row.toPath} (${row.statusCode})`,
    });
    return row;
  });
}

export async function deleteRedirect(fromPath: string, actorId: string) {
  return db().transaction(async (tx) => {
    const [row] = await tx.delete(redirects).where(eq(redirects.fromPath, fromPath)).returning();
    if (!row) throw errors.notFound("Redirect");
    await recordAudit(tx, {
      actorId,
      action: "redirect.delete",
      entityType: "redirect",
      entityId: row.fromPath,
      summary: `Removed redirect ${row.fromPath}`,
    });
    return row;
  });
}
