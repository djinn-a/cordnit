import { z } from "zod";
import { CTA_ACTIONS, CTA_VARIANTS } from "./types";

export const ctaSchema = z.object({
  label: z.string().min(1, "Label is required"),
  action: z.enum(CTA_ACTIONS).default("link"),
  href: z.string().optional(),
  newTab: z.boolean().optional(),
  variant: z.enum(CTA_VARIANTS).optional(),
}).superRefine((data, ctx) => {
  if (data.action === "link" && !data.href) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Link requires an href URL",
      path: ["href"],
    });
  }
  if (data.action === "scrollTo") {
    if (!data.href) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Scroll to requires an anchor href (e.g. #section)",
        path: ["href"],
      });
    } else if (!data.href.startsWith("#")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Scroll to href must start with #",
        path: ["href"],
      });
    }
  }
});
