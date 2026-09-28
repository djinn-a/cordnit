import { z } from "zod";
import {
  ANCHOR_PATTERN,
  CTA_ACTIONS,
  CTA_HREF_MAX,
  CTA_LABEL_MAX,
  CTA_VARIANTS,
  LINK_PATTERN,
} from "./types";

export const ctaSchema = z
  .object({
    label: z
      .string()
      .max(CTA_LABEL_MAX, `Button label must be at most ${CTA_LABEL_MAX} characters.`)
      .refine((v) => v.trim().length > 0, "Button label is required."),
    action: z.enum(CTA_ACTIONS).default("link"),
    href: z.string().max(CTA_HREF_MAX).optional(),
    newTab: z.boolean().optional(),
    variant: z.enum(CTA_VARIANTS).optional(),
  })
  .superRefine((cta, ctx) => {
    if (cta.action === "link") {
      if (!cta.href) {
        ctx.addIssue({ code: "custom", path: ["href"], message: "A link button needs a URL." });
      } else if (!LINK_PATTERN.test(cta.href)) {
        ctx.addIssue({
          code: "custom",
          path: ["href"],
          message: "Use a path (/about), anchor (#id), https://, mailto: or tel: link.",
        });
      }
    }
    if (cta.action === "scrollTo" && !(cta.href && ANCHOR_PATTERN.test(cta.href))) {
      ctx.addIssue({ code: "custom", path: ["href"], message: "Use a section anchor like #contact." });
    }
  });
