import "server-only";
import { and, eq, sql } from "drizzle-orm";
import type { z } from "zod";
import type { saveSiteSeoSchema } from "@/lib/cms/inputs";
import { mergeSiteSeo } from "@/lib/seo/site";
import { db } from "@/server/db/client";
import { siteSettings } from "@/server/db/schema";
import { errors } from "@/server/errors";
import { recordAudit } from "../audit";

const SETTINGS_ID = "global";

/** Admin read: uncached, merged with defaults so the form always opens complete. */
export async function getSiteSettingsForEdit() {
  const [row] = await db().select().from(siteSettings).where(eq(siteSettings.id, SETTINGS_ID));
  return { seo: mergeSiteSeo(row?.seo), lockVersion: row?.lockVersion ?? 0, updatedAt: row?.updatedAt ?? null };
}

/** `lockVersion` 0 means the row does not exist yet (fresh database). */
export async function saveSiteSeo(input: z.output<typeof saveSiteSeoSchema>, actorId: string) {
  return db().transaction(async (tx) => {
    if (input.lockVersion === 0) {
      const [created] = await tx
        .insert(siteSettings)
        .values({ id: SETTINGS_ID, seo: input.seo, updatedBy: actorId })
        .onConflictDoNothing()
        .returning();
      if (!created) throw errors.staleWrite();
      await recordAudit(tx, { actorId, action: "site.update_seo", entityType: "site", entityId: SETTINGS_ID, summary: "Updated site SEO settings" });
      return created;
    }

    const [row] = await tx
      .update(siteSettings)
      .set({ seo: input.seo, lockVersion: sql`${siteSettings.lockVersion} + 1`, updatedBy: actorId })
      .where(and(eq(siteSettings.id, SETTINGS_ID), eq(siteSettings.lockVersion, input.lockVersion)))
      .returning();
    if (!row) throw errors.staleWrite();
    await recordAudit(tx, { actorId, action: "site.update_seo", entityType: "site", entityId: SETTINGS_ID, summary: "Updated site SEO settings" });
    return row;
  });
}
