"use server";

import { saveSiteSeoSchema } from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { invalidateSiteSettings } from "./invalidate";
import { withAction } from "./with-action";

export const saveSiteSeoAction = withAction("site.saveSeo", saveSiteSeoSchema, async (input, { session }) => {
  const row = await cms.siteSettings.saveSiteSeo(input, session.userId);
  invalidateSiteSettings();
  return { lockVersion: row.lockVersion };
});
