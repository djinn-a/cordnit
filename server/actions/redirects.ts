"use server";

import { z } from "zod";
import { redirectSchema } from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { invalidateRedirects } from "./invalidate";
import { withAction } from "./with-action";

export const upsertRedirectAction = withAction("redirects.upsert", redirectSchema, async (input, { session }) => {
  const row = await cms.redirects.upsertRedirect(input, session.userId);
  invalidateRedirects();
  return row;
});

export const deleteRedirectAction = withAction(
  "redirects.delete",
  z.object({ fromPath: z.string().trim().min(1).max(2048) }),
  async (input, { session }) => {
    const row = await cms.redirects.deleteRedirect(input.fromPath, session.userId);
    invalidateRedirects();
    return row;
  },
);
