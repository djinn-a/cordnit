"use server";

import { z } from "zod";
import { MEDIA_PATH_PATTERN, MEDIA_RULES, MEDIA_TYPES, type MediaPurpose, type MediaType } from "@/lib/cms/media";
import { createSignedImageUpload, verifyUploadedImage } from "@/server/storage/supabase-storage";
import { withAction } from "./with-action";

const purposeSchema = z.enum(Object.keys(MEDIA_RULES) as [MediaPurpose, ...MediaPurpose[]]);

const mediaUploadSchema = z
  .object({
    purpose: purposeSchema,
    fileName: z.string().trim().min(1).max(255),
    contentType: z.enum(Object.keys(MEDIA_TYPES) as [MediaType, ...MediaType[]], "Use a JPG, PNG, WebP or SVG image."),
    size: z.number().int().positive(),
  })
  .superRefine((input, ctx) => {
    const rule = MEDIA_RULES[input.purpose];
    if (!rule.types.includes(input.contentType)) ctx.addIssue({ code: "custom", path: ["contentType"], message: "This file type is not allowed here." });
    if (input.size > rule.maxBytes) ctx.addIssue({ code: "custom", path: ["size"], message: "This file is too large." });
  });

export const createMediaUploadAction = withAction(
  "media.createUpload",
  mediaUploadSchema,
  async (input) => createSignedImageUpload(input.purpose, input.contentType),
  { refresh: false },
);

export const verifyMediaUploadAction = withAction(
  "media.verifyUpload",
  z.object({ purpose: purposeSchema, path: z.string().regex(MEDIA_PATH_PATTERN, "Unknown upload path.") }),
  async (input) => {
    await verifyUploadedImage(input.path, input.purpose);
    return { ok: true as const };
  },
  { refresh: false },
);
