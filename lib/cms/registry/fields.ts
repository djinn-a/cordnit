import { z } from "zod";
import { LINK_PATTERN, ctaSchema } from "@/lib/cta";
import { isAllowedSeoImageUrl } from "@/lib/cms/inputs";
import { ITEM_ID_KEY } from "./props";

/**
 * Field builders for section content schemas. `.meta()` drives the admin form
 * generator (via z.toJSONSchema), so every field declares its label and widget.
 */
export type FieldWidget = "text" | "textarea" | "url" | "number" | "select" | "checkbox" | "cta" | "image";

/** Upload purposes; each maps to its own size limit in storage. */
export type ImagePurpose = "logo" | "icon" | "media";

export type FieldMeta = {
  label: string;
  widget?: FieldWidget;
  help?: string;
  itemLabel?: string;
  options?: Array<{ value: string; label: string; help?: string }>;
  /** `cta` widget only: false when the placement's design fixes the button style. */
  ctaVariant?: boolean;
  /** `image` widget only. */
  purpose?: ImagePurpose;
};

export const text = (label: string, max = 500) =>
  z.string().max(max, `${label} must be at most ${max} characters.`).meta({ label, widget: "text" });

export const textarea = (label: string, max = 5000) =>
  z.string().max(max, `${label} must be at most ${max} characters.`).meta({ label, widget: "textarea" });

export const link = (label: string) =>
  z
    .string()
    .max(2048)
    .refine((v) => v === "" || LINK_PATTERN.test(v), {
      message: "Use a path (/about), anchor (#id), https://, mailto: or tel: link.",
    })
    .meta({ label, widget: "url" });

export const num = (label: string) => z.number().finite().meta({ label, widget: "number" });

export const select = (label: string, options: Array<{ value: string; label: string; help?: string }>) =>
  z.enum(options.map((o) => o.value) as [string, ...string[]]).meta({ label, widget: "select", options });

export const bool = (label: string) => z.boolean().meta({ label, widget: "checkbox" });

export const cta = (label: string, options: { variant?: boolean } = {}) =>
  ctaSchema.meta({ label, widget: "cta", ctaVariant: options.variant ?? true } satisfies FieldMeta);

/** An uploaded image with required alt text. Rendered only through <img>, never inlined, so SVG scripts cannot run. */
export const image = (label: string, purpose: ImagePurpose) =>
  z
    .object({
      url: z.string().trim().max(2048).refine(isAllowedSeoImageUrl, "Upload an image or use a /path."),
      alt: z.string().trim().min(1, `${label}: describe the image in the alt text.`).max(200),
      width: z.number().int().positive().max(10000).optional(),
      height: z.number().int().positive().max(10000).optional(),
    })
    .meta({ label, widget: "image", purpose } satisfies FieldMeta);

export const itemId = () => z.string().min(1).max(100);

export const group = <T extends z.ZodRawShape>(label: string, shape: T) => z.object(shape).meta({ label });

export const list = <T extends z.ZodRawShape>(label: string, itemLabel: string, shape: T) =>
  z
    .array(z.object({ [ITEM_ID_KEY]: itemId(), ...shape }))
    .max(100)
    .meta({ label, itemLabel });

export const stringList = (label: string, item: z.ZodString = textarea("Item")) =>
  z.array(item).max(100).meta({ label, itemLabel: "Item" });

export const section = <T extends z.ZodRawShape>(shape: T) => z.object(shape);
