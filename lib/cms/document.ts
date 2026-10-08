/**
 * Published page contract: what the public site renders.
 * Produced by the publish service, stored in `cms.published_pages.document`,
 * read by the catch-all route through one primary-key lookup.
 */
import type { SectionType } from "./types";

export const PAGE_SHELLS = ["default", "contact"] as const;
export type PageShell = (typeof PAGE_SHELLS)[number];

export const PAGE_SPACINGS = ["default", "compact", "compact-top"] as const;
export type PageSpacing = (typeof PAGE_SPACINGS)[number];

export const PAGE_STATUSES = ["draft", "published", "archived"] as const;
export type PageStatus = (typeof PAGE_STATUSES)[number];

export type SeoImage = { url: string; width?: number; height?: number; alt?: string };

export type PageSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SeoImage;
  keywords?: string[];
};

/** Site-wide SEO defaults. Edited in /admin/seo and live on save. */
export type SiteSeo = {
  siteName: string;
  /** Must contain `%s`, replaced by the page title. */
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage?: SeoImage;
  twitterHandle?: string;
  organization: { legalName?: string; logo?: SeoImage; sameAs: string[] };
  robots: { discourageAll: boolean; extraDisallow: string[] };
};

export type BreadcrumbItem = { label: string; href?: string; isCurrent?: boolean };

export type SectionProps = Record<string, unknown>;

/** Inline section: props are already merged (system props + editable content). */
export type InlineSectionNode = {
  _key: string;
  _type: SectionType;
  props: SectionProps;
};

/** Reference to a Global Block: resolved at render time through its own cache tag. */
export type BlockRefSectionNode = {
  _key: string;
  _type: SectionType;
  blockId: string;
};

export type SectionNode = InlineSectionNode | BlockRefSectionNode;

export type PublishedPageDocument = {
  pageId: string;
  slug: string;
  title: string;
  shell: PageShell;
  spacing: PageSpacing;
  seo: PageSeo;
  breadcrumbs: BreadcrumbItem[];
  sections: SectionNode[];
  version: number;
  publishedAt: string;
};

export type PublishedBlock = {
  blockId: string;
  type: SectionType;
  props: SectionProps;
  version: number;
};

export function isBlockRef(node: SectionNode): node is BlockRefSectionNode {
  return "blockId" in node && typeof node.blockId === "string";
}

/** Home is stored under the reserved slug "home" and served at "/". */
export const HOME_SLUG = "home";

export function slugToPath(slug: string): string {
  return slug === HOME_SLUG ? "/" : `/${slug}`;
}

/** Returns null for malformed percent-encoding so callers can 404 instead of throwing. */
export function pathSegmentsToSlug(segments: readonly string[] | undefined): string | null {
  if (!segments || segments.length === 0) return HOME_SLUG;
  try {
    return segments.map((s) => decodeURIComponent(s).toLowerCase()).join("/");
  } catch {
    return null;
  }
}

export function slugToSegments(slug: string): string[] {
  return slug === HOME_SLUG ? [] : slug.split("/");
}

export const pageTag = (slug: string) => `cms:page:${slug}`;
export const blockTag = (blockId: string) => `cms:block:${blockId}`;
export const blockKeyTag = (key: string) => `cms:block-key:${key}`;
// Stable keys connect existing Global Blocks to the site shell without creating a parallel CMS.
export const SITE_NAVBAR_BLOCK_KEY = "site-navbar";
export const SITE_FOOTER_BLOCK_KEY = "site-footer";
export const PAGES_LIST_TAG = "cms:pages";
export const REDIRECTS_TAG = "cms:redirects";
export const SITE_SETTINGS_TAG = "cms:site";
