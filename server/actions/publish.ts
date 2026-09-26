"use server";

import { pageRefSchema, publishPageSchema, rollbackSchema } from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { invalidateLivePage } from "./invalidate";
import { withAction } from "./with-action";

export const publishPageAction = withAction("publish.page", publishPageSchema, async (input, { session }) => {
  const outcome = await cms.publish.publishPage(input, session.userId);
  invalidateLivePage([outcome.slug, outcome.previousSlug]);
  return outcome;
});

export const unpublishPageAction = withAction("publish.unpublish", pageRefSchema, async (input, { session }) => {
  const result = await cms.publish.unpublishPage(input, session.userId);
  invalidateLivePage([result.slug]);
  return result;
});

export const rollbackPageAction = withAction("publish.rollback", rollbackSchema, async (input, { session }) => {
  const outcome = await cms.publish.rollbackPage(input, session.userId);
  invalidateLivePage([outcome.slug, outcome.previousSlug]);
  return outcome;
});
