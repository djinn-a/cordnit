import type { SiteSeo } from "@/lib/cms/document";

export const SITE_NAME = "Cordinit";

// Canonicals and JSON-LD always target production; SITE_URL can be localhost or a preview host.
export const PRODUCTION_SITE_URL = "https://cordinit.com";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_SITE_URL).replace(/\/+$/, "");

export const DEFAULT_TITLE = "Cordinit | Secure Digital Transformation";

export const DEFAULT_DESCRIPTION =
  "Cordinit helps enterprises modernise securely across cybersecurity, Salesforce, AI automation, cloud and application engineering.";

/** Never crawlable, regardless of CMS settings. */
export const SYSTEM_DISALLOW = ["/api/", "/admin", "/preview/"] as const;

/** Used when the settings row is missing, partial, or the database is unreachable. */
export const DEFAULT_SITE_SEO: SiteSeo = {
  siteName: SITE_NAME,
  titleTemplate: `%s | ${SITE_NAME}`,
  defaultTitle: DEFAULT_TITLE,
  defaultDescription: DEFAULT_DESCRIPTION,
  organization: { sameAs: [] },
  robots: { discourageAll: false, extraDisallow: [] },
};

function text(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

/** Stored values win field by field; blanks fall back to the defaults. */
export function mergeSiteSeo(stored: Partial<SiteSeo> | null | undefined): SiteSeo {
  const s = stored ?? {};
  const template = text(s.titleTemplate, DEFAULT_SITE_SEO.titleTemplate);
  return {
    siteName: text(s.siteName, DEFAULT_SITE_SEO.siteName),
    titleTemplate: template.includes("%s") ? template : DEFAULT_SITE_SEO.titleTemplate,
    defaultTitle: text(s.defaultTitle, DEFAULT_SITE_SEO.defaultTitle),
    defaultDescription: text(s.defaultDescription, DEFAULT_SITE_SEO.defaultDescription),
    defaultOgImage: s.defaultOgImage?.url ? s.defaultOgImage : undefined,
    twitterHandle: s.twitterHandle?.trim() || undefined,
    organization: {
      legalName: s.organization?.legalName?.trim() || undefined,
      logo: s.organization?.logo?.url ? s.organization.logo : undefined,
      sameAs: s.organization?.sameAs ?? [],
    },
    robots: {
      discourageAll: s.robots?.discourageAll === true,
      extraDisallow: s.robots?.extraDisallow ?? [],
    },
  };
}

export function applyTitleTemplate(template: string, title: string): string {
  return template.replace("%s", title);
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
