import { z } from "zod";
import { PAGE_SHELLS, PAGE_SPACINGS } from "./document";
import { SECTION_TYPES } from "./types";

/** Paths owned by code routes or infrastructure; pages can never claim them. */
export const RESERVED_SLUG_ROOTS = [
  "admin",
  "api",
  "preview",
  "studio",
  "_next",
  "breach",
  "privacy",
  "cms-404",
  "sitemap.xml",
  "robots.txt",
  "favicon.ico",
] as const;

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*(\/[a-z0-9]+(-[a-z0-9]+)*)*$/;

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .transform((v) => v.replace(/^\/+|\/+$/g, ""))
  .pipe(
    z
      .string()
      .min(1, "Slug is required.")
      .max(200, "Slug must be at most 200 characters.")
      .regex(SLUG_PATTERN, "Use lowercase letters, numbers and dashes, with / between segments.")
      .refine((v) => !(RESERVED_SLUG_ROOTS as readonly string[]).includes(v.split("/")[0]), {
        message: "This path is reserved by the system.",
      }),
  );

export const uuidSchema = z.uuid("Invalid id.");
export const lockVersionSchema = z.number().int().positive();

export const seoSchema = z.object({
  title: z.string().trim().max(70, "Keep SEO titles under 70 characters.").optional(),
  description: z.string().trim().max(170, "Keep meta descriptions under 170 characters.").optional(),
  canonical: z
    .string()
    .trim()
    .max(2048)
    .refine((v) => v === "" || /^(https?:\/\/|\/)/.test(v), "Use an absolute URL or a /path.")
    .optional(),
  noindex: z.boolean().optional(),
});

export const breadcrumbsSchema = z
  .array(
    z.object({
      label: z.string().trim().min(1, "Label is required.").max(80),
      href: z
        .string()
        .trim()
        .max(2048)
        .refine((v) => v === "" || /^(\/|#|https?:\/\/)/.test(v), "Use a /path or https:// link.")
        .optional(),
      isCurrent: z.boolean().optional(),
    }),
  )
  .max(10);

export const pageMetaSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120),
  slug: slugSchema,
  shell: z.enum(PAGE_SHELLS),
  spacing: z.enum(PAGE_SPACINGS),
  seo: seoSchema,
  breadcrumbs: breadcrumbsSchema,
});

export const createPageSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120),
  slug: slugSchema,
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("blank") }),
    z.object({ kind: z.literal("template"), templateId: uuidSchema }),
    z.object({ kind: z.literal("clone"), pageId: uuidSchema }),
  ]),
});

export const updatePageMetaSchema = pageMetaSchema.extend({
  pageId: uuidSchema,
  lockVersion: lockVersionSchema,
});

export const pageRefSchema = z.object({ pageId: uuidSchema, lockVersion: lockVersionSchema });

export const sectionTypeSchema = z.enum(SECTION_TYPES);

export const addSectionSchema = pageRefSchema.extend({
  /** Insert after this section; null = at the top; omitted = at the end. */
  afterSectionId: uuidSchema.nullable().optional(),
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("type"), type: sectionTypeSchema }),
    z.object({ kind: z.literal("block"), blockId: uuidSchema }),
    z.object({ kind: z.literal("copy"), sectionId: uuidSchema }),
  ]),
});

export const updateSectionSchema = pageRefSchema.extend({
  sectionId: uuidSchema,
  label: z.string().trim().max(80).nullable().optional(),
  content: z.record(z.string(), z.unknown()),
});

/** prevId / nextId are the moved section's neighbours after the drop (null at the edges). */
export const moveSectionSchema = pageRefSchema.extend({
  sectionId: uuidSchema,
  prevId: uuidSchema.nullable(),
  nextId: uuidSchema.nullable(),
});

export const sectionRefSchema = pageRefSchema.extend({ sectionId: uuidSchema });

export const toggleSectionSchema = sectionRefSchema.extend({ isHidden: z.boolean() });

export const publishPageSchema = pageRefSchema.extend({
  note: z.string().trim().max(200).optional(),
});

export const rollbackSchema = pageRefSchema.extend({
  version: z.number().int().positive(),
  restoreDraft: z.boolean().default(true),
});

export const blockKeySchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2)
  .max(60)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers and dashes.");

export const convertToBlockSchema = sectionRefSchema.extend({
  name: z.string().trim().min(1, "Name is required.").max(80),
  key: blockKeySchema,
});

export const updateBlockSchema = z.object({
  blockId: uuidSchema,
  lockVersion: lockVersionSchema,
  name: z.string().trim().min(1).max(80),
  content: z.record(z.string(), z.unknown()),
});

export const blockRefSchema = z.object({ blockId: uuidSchema, lockVersion: lockVersionSchema });

export const saveTemplateSchema = z.object({
  pageId: uuidSchema,
  name: z.string().trim().min(1, "Name is required.").max(80),
  key: blockKeySchema,
  description: z.string().trim().max(300).optional(),
});

export const redirectSchema = z.object({
  fromPath: z
    .string()
    .trim()
    .regex(/^\/[a-z0-9\-/]*$/, "Use a lowercase /path."),
  toPath: z
    .string()
    .trim()
    .regex(/^(\/[a-z0-9\-/#?=&]*|https?:\/\/.+)$/, "Use a /path or https:// URL."),
  statusCode: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]).default(308),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(12, "Use at least 12 characters.").max(128),
    confirmPassword: z.string(),
  })
  .refine((v) => v.newPassword === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const loginSchema = z.object({
  username: z.string().trim().toLowerCase().min(3, "Enter your username.").max(40),
  password: z.string().min(1, "Enter your password.").max(128),
});
