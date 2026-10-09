"use client";

import MediaField, { type MediaFieldProps } from "./MediaField";

const RECOMMENDED = { width: 1200, height: 630 };

/** Social share / logo images for SEO settings. Pass `recommended={null}` to skip the size hint (e.g. logos). */
export default function SeoImageField({ recommended = RECOMMENDED, ...props }: Readonly<Omit<MediaFieldProps, "purpose">>) {
  return <MediaField purpose="seo" recommended={recommended} {...props} />;
}
