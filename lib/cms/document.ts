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

export type PageSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
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
export const PAGES_LIST_TAG = "cms:pages";
export const REDIRECTS_TAG = "cms:redirects";
