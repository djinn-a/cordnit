import "server-only";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/server/env";
import { AppError } from "@/server/errors";

/** Public bucket that already serves site imagery (see scripts/migrate-images.ts). */
export const ASSETS_BUCKET = "website-assets";

export const SEO_IMAGE_TYPES = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as const;
export type SeoImageType = keyof typeof SEO_IMAGE_TYPES;
export const SEO_IMAGE_MAX_BYTES = 5 * 1024 * 1024;

let client: SupabaseClient | null = null;

function storageClient(): SupabaseClient {
  if (client) return client;
  const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY } = env();
  if (!SUPABASE_SECRET_KEY) {
    throw new AppError("INTERNAL", "Image uploads are not configured.", { cause: new Error("SUPABASE_SECRET_KEY is not set") });
  }
  client = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

/** One-time upload ticket: the browser sends the file straight to Storage, never through our server. */
export async function createSignedImageUpload(folder: string, contentType: SeoImageType) {
  const path = `${folder}/${randomUUID()}.${SEO_IMAGE_TYPES[contentType]}`;
  const bucket = storageClient().storage.from(ASSETS_BUCKET);
  const { data, error } = await bucket.createSignedUploadUrl(path);
  if (error || !data) throw new AppError("INTERNAL", "Could not prepare the upload. Try again.", { cause: error });
  const { data: pub } = bucket.getPublicUrl(path);
  return { bucket: ASSETS_BUCKET, path: data.path, token: data.token, publicUrl: pub.publicUrl };
}
