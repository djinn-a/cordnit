import type { Metadata } from "next";
import type { PublishedPageDocument } from "@/lib/cms/document";
import { getPageCanonicalUrl } from "@/lib/seo/canonical-url";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "./site";

export function buildPageMetadata(doc: PublishedPageDocument): Metadata {
  const seo = doc.seo ?? {};
  const title = seo.title?.trim() || `${doc.title} | ${SITE_NAME}`;
  const description = seo.description?.trim() || DEFAULT_DESCRIPTION;
  // Share this exact URL with JSON-LD to keep canonical signals consistent.
  const canonical = getPageCanonicalUrl(doc);

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
      url: canonical,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
