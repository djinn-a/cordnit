"use server";

import type { z } from "zod";
import { createPageSchema, pageRefSchema, updatePageMetaSchema } from "@/lib/cms/inputs";
import type { AdminSession } from "@/server/auth";
import { cms } from "@/server/cms";
import { invalidateLivePage } from "./invalidate";
import { withAction } from "./with-action";

export const createPageAction = withAction(
  "pages.create",
  createPageSchema,
  async (input, { session }) => {
    const page = await cms.pages.createPage(input, session.userId);
    return { pageId: page.id, slug: page.slug };
  },
  { redirectTo: (page) => `/admin/pages/${page.pageId}` },
);

/** Slug, shell, SEO and breadcrumb changes are drafts too: they go live on publish. */
export const updatePageMetaAction = withAction("pages.updateMeta", updatePageMetaSchema, async (input, { session }) => {
  const page = await cms.pages.updatePageMeta(input, session.userId);
  return { lockVersion: page.lockVersion, slug: page.slug };
});

async function deletePage(input: z.output<typeof pageRefSchema>, { session }: { session: AdminSession }) {
  const result = await cms.pages.deletePage(input, session.userId);
  if (result.liveSlug) invalidateLivePage([result.liveSlug]);
  return result;
}

/** From the pages list: the list re-renders in place. */
export const deletePageAction = withAction("pages.delete", pageRefSchema, deletePage);

/** From the page's own editor, which cannot render once the page is gone. */
export const deletePageAndExitAction = withAction("pages.delete", pageRefSchema, deletePage, {
  redirectTo: () => "/admin",
});
