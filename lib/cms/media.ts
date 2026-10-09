/** Upload rules shared by the admin uploader and the server that signs and verifies uploads. */

export const MEDIA_TYPES = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/svg+xml": "svg",
} as const;
export type MediaType = keyof typeof MEDIA_TYPES;

export type MediaPurpose = "seo" | "logo" | "icon" | "media";

const RASTER: readonly MediaType[] = ["image/jpeg", "image/png", "image/webp"];
const ANY: readonly MediaType[] = [...RASTER, "image/svg+xml"];

export const MEDIA_RULES: Record<MediaPurpose, { types: readonly MediaType[]; maxBytes: number; folder: string }> = {
  seo: { types: RASTER, maxBytes: 5 * 1024 * 1024, folder: "seo" },
  logo: { types: ANY, maxBytes: 1024 * 1024, folder: "chrome/logos" },
  icon: { types: ANY, maxBytes: 512 * 1024, folder: "chrome/icons" },
  media: { types: RASTER, maxBytes: 5 * 1024 * 1024, folder: "chrome/media" },
};

export function describeRule(purpose: MediaPurpose): string {
  const { types, maxBytes } = MEDIA_RULES[purpose];
  const names = types.map((t) => MEDIA_TYPES[t].toUpperCase()).join(", ");
  const size = maxBytes >= 1024 * 1024 ? `${maxBytes / (1024 * 1024)} MB` : `${maxBytes / 1024} KB`;
  return `${names}, up to ${size}`;
}

/** Storage paths the signer issues: `<folder>/<uuid>.<ext>`. */
export const MEDIA_PATH_PATTERN = /^(seo|chrome\/(logos|icons|media))\/[0-9a-f-]{36}\.(jpg|png|webp|svg)$/;
