import "server-only";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { MEDIA_RULES, MEDIA_TYPES, type MediaPurpose, type MediaType } from "@/lib/cms/media";
import { env } from "@/server/env";
import { AppError, errors } from "@/server/errors";

/** Public bucket that already serves site imagery (see scripts/migrate-images.ts). */
export const ASSETS_BUCKET = "website-assets";

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
export async function createSignedImageUpload(purpose: MediaPurpose, contentType: MediaType) {
  const rule = MEDIA_RULES[purpose];
  if (!rule.types.includes(contentType)) throw errors.validation("This file type is not allowed here.");
  const path = `${rule.folder}/${randomUUID()}.${MEDIA_TYPES[contentType]}`;
  const bucket = storageClient().storage.from(ASSETS_BUCKET);
  const { data, error } = await bucket.createSignedUploadUrl(path);
  if (error || !data) throw new AppError("INTERNAL", "Could not prepare the upload. Try again.", { cause: error });
  const { data: pub } = bucket.getPublicUrl(path);
  return { bucket: ASSETS_BUCKET, path: data.path, token: data.token, publicUrl: pub.publicUrl };
}

const startsWith = (bytes: Uint8Array, sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);

function sniffRaster(bytes: Uint8Array): MediaType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return "image/jpeg";
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "image/png";
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)) return "image/webp";
  return null;
}

/** SVGs are served from storage and shown via <img>, but anything active is still refused. */
const SVG_ACTIVE_CONTENT = /<script|<foreignobject|<iframe|<embed|<object|\son[a-z]+\s*=|javascript:|data:text\/html|<!entity/i;

function isSafeSvg(bytes: Uint8Array): boolean {
  const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes).replace(/^\uFEFF/, "");
  const head = text.replace(/<\?xml[\s\S]*?\?>/, "").replace(/<!--[\s\S]*?-->/g, "").trimStart();
  return /^<svg[\s>]/i.test(head) && !SVG_ACTIVE_CONTENT.test(text);
}

/**
 * Checks the stored bytes against the claimed type, since the browser reports
 * the content type. Rejected files are deleted.
 */
export async function verifyUploadedImage(path: string, purpose: MediaPurpose): Promise<void> {
  const rule = MEDIA_RULES[purpose];
  const bucket = storageClient().storage.from(ASSETS_BUCKET);
  const { data, error } = await bucket.download(path);
  if (error || !data) throw new AppError("INTERNAL", "Could not check the upload. Try again.", { cause: error });
  const bytes = new Uint8Array(await data.arrayBuffer());
  const claimed = Object.entries(MEDIA_TYPES).find(([, ext]) => path.endsWith(`.${ext}`))?.[0] as MediaType | undefined;

  const ok =
    claimed !== undefined &&
    rule.types.includes(claimed) &&
    bytes.byteLength <= rule.maxBytes &&
    (claimed === "image/svg+xml" ? isSafeSvg(bytes) : sniffRaster(bytes) === claimed);
  if (ok) return;

  await bucket.remove([path]);
  throw errors.validation(
    claimed === "image/svg+xml"
      ? "This SVG contains scripts or embedded content and was rejected. Export a plain SVG and try again."
      : "This file is not a valid image of the type it claims to be.",
  );
}
