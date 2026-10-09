"use server";

import { z } from "zod";
import { SEO_IMAGE_MAX_BYTES, SEO_IMAGE_TYPES, createSignedImageUpload, type SeoImageType } from "@/server/storage/supabase-storage";
import { withAction } from "./with-action";

const seoImageUploadSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(Object.keys(SEO_IMAGE_TYPES) as [SeoImageType, ...SeoImageType[]], "Use a JPG, PNG or WebP image."),
  size: z.number().int().positive().max(SEO_IMAGE_MAX_BYTES, "Images must be 5 MB or smaller."),
});

export const createSeoImageUploadAction = withAction(
  "media.createSeoImageUpload",
  seoImageUploadSchema,
  async (input) => createSignedImageUpload("seo", input.contentType),
  { refresh: false },
);
