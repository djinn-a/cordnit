"use server";

import { z } from "zod";
import { saveTemplateSchema, uuidSchema } from "@/lib/cms/inputs";
import { cms } from "@/server/cms";
import { withAction } from "./with-action";

/** Saved from the page editor, whose data does not include layouts: nothing to re-render. */
export const saveTemplateAction = withAction(
  "templates.save",
  saveTemplateSchema,
  async (input, { session }) => {
    const tpl = await cms.templates.saveTemplateFromPage(input, session.userId);
    return { templateId: tpl.id };
  },
  { refresh: false },
);

export const deleteTemplateAction = withAction(
  "templates.delete",
  z.object({ templateId: uuidSchema }),
  (input, { session }) => cms.templates.deleteTemplate(input.templateId, session.userId),
);
