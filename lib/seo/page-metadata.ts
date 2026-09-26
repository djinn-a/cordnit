import type { Metadata } from "next";
import { slugToPath, type PublishedPageDocument } from "@/lib/cms/document";
import { DEFAULT_DESCRIPTION, SITE_NAME, absoluteUrl } from "./site";

export function buildPageMetadata(doc: PublishedPageDocument): Metadata {
  const seo = doc.seo ?? {};
  const path = slugToPath(doc.slug);
  const title = seo.title?.trim() || `${doc.title} | ${SITE_NAME}`;
  const description = seo.description?.trim() || DEFAULT_DESCRIPTION;
  const canonical = seo.canonical?.trim() || absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: seo.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url: absoluteUrl(path),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
