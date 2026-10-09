import type { Metadata } from "next";
import type { PublishedPageDocument, SeoImage, SiteSeo } from "@/lib/cms/document";
import { getPageCanonicalUrl } from "@/lib/seo/canonical-url";
import { applyTitleTemplate } from "./site";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

function toOgImage(image: SeoImage | undefined, fallbackAlt: string): OgImage | undefined {
  if (!image?.url) return;
  return { url: image.url, width: image.width, height: image.height, alt: image.alt?.trim() || fallbackAlt };
}

/** Site-level metadata: inherited by every public route that does not override it. */
export function buildSiteMetadata(site: SiteSeo): Metadata {
  const image = toOgImage(site.defaultOgImage, site.siteName);
  return {
    title: { default: site.defaultTitle, template: site.titleTemplate },
    description: site.defaultDescription,
    applicationName: site.siteName,
    robots: site.robots.discourageAll ? { index: false, follow: false } : undefined,
    openGraph: { type: "website", siteName: site.siteName, images: image ? [image] : undefined },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      images: image ? [image] : undefined,
    },
  };
}

export function buildPageMetadata(doc: PublishedPageDocument, site: SiteSeo): Metadata {
  const seo = doc.seo ?? {};
  const title = seo.title?.trim() || applyTitleTemplate(site.titleTemplate, doc.title);
  const description = seo.description?.trim() || site.defaultDescription;
  const ogTitle = seo.ogTitle?.trim() || title;
  const ogDescription = seo.ogDescription?.trim() || description;
  const image = toOgImage(seo.ogImage, ogTitle) ?? toOgImage(site.defaultOgImage, site.siteName);
  const keywords = seo.keywords?.map((k) => k.trim()).filter(Boolean);
  // Share this exact URL with JSON-LD to keep canonical signals consistent.
  const canonical = getPageCanonicalUrl(doc);
  const hidden = seo.noindex || site.robots.discourageAll;

  return {
    title: { absolute: title },
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: { canonical },
    robots: hidden ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.siteName,
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      title: ogTitle,
      description: ogDescription,
      images: image ? [image] : undefined,
    },
  };
}
