/**
 * Shared rules for the site Navbar and Footer Global Blocks. Pure functions only:
 * imported by the content schemas, the publish service, the editor and the renderers.
 */

export const SOCIAL_PLATFORMS = [
  { id: "linkedin", label: "LinkedIn", icon: "/icons/linkedin.svg" },
  { id: "youtube", label: "YouTube", icon: "/icons/youtube.svg" },
  { id: "instagram", label: "Instagram", icon: "/icons/instagram.svg" },
  { id: "facebook", label: "Facebook", icon: "/icons/facebook.svg" },
  { id: "x", label: "X (Twitter)", icon: "/icons/x.svg" },
  { id: "whatsapp", label: "WhatsApp", icon: "/icons/whatsapp.svg" },
] as const;

export type SocialPlatformId = (typeof SOCIAL_PLATFORMS)[number]["id"];

export function socialPlatform(id: string) {
  return SOCIAL_PLATFORMS.find((p) => p.id === id);
}

/** Code-owned pages outside the CMS that site chrome may link to. */
export const CODE_OWNED_ROUTES: ReadonlySet<string> = new Set(["/breach", "/privacy"]);

/** Allowed destinations: blank, same-site path, #anchor, https://, mailto: and tel:. */
export function isSafeChromeHref(value: string): boolean {
  if (value === "" || value.startsWith("#")) return true;
  if (value.startsWith("/")) return !value.startsWith("//") && !value.includes("\\");
  if (/^https:\/\//i.test(value)) {
    try {
      const url = new URL(value);
      return url.protocol === "https:" && Boolean(url.hostname);
    } catch {
      return false;
    }
  }
  return /^(mailto|tel):[^\s]+$/i.test(value);
}

/** Normalised lowercase path for same-site links (`/About/` -> `/about`), or null for anything else. */
export function internalPath(href: string): string | null {
  if (!href.startsWith("/") || href.startsWith("//") || href.includes("\\")) return null;
  try {
    const pathname = decodeURIComponent(new URL(href, "https://cms.invalid").pathname);
    if (pathname.startsWith("//") || pathname.includes("\\")) return null;
    return (pathname.replace(/\/+$/, "") || "/").toLowerCase();
  } catch {
    return null;
  }
}

export function isExternalHref(href: string): boolean {
  return /^https:\/\//i.test(href);
}

/** Every editable destination in a Navbar or Footer, with a human-readable location for error messages. */
export type ChromeLink = { where: string; href: string };

type LinkLike = { label?: string; title?: string; href: string };

const describe = (prefix: string, item: LinkLike, index: number) =>
  `${prefix} "${item.label || item.title || `#${index + 1}`}"`;

export function collectNavbarLinks(content: {
  logoHref: string;
  topBarBreachHref: string;
  solutionsMenu: { label: string; href: string; exploreAllHref: string; items: LinkLike[] };
  navLinks: LinkLike[];
}): ChromeLink[] {
  return [
    { where: "Logo destination", href: content.logoHref },
    { where: "Top bar breach link", href: content.topBarBreachHref },
    { where: `Solutions menu "${content.solutionsMenu.label}"`, href: content.solutionsMenu.href },
    { where: "Solutions explore link", href: content.solutionsMenu.exploreAllHref },
    ...content.solutionsMenu.items.map((item, i) => ({ where: describe("Solution", item, i), href: item.href })),
    ...content.navLinks.map((item, i) => ({ where: describe("Navigation link", item, i), href: item.href })),
  ];
}

export function collectFooterLinks(content: {
  logoHref: string;
  navColumns: { title: string; links: LinkLike[] }[];
  socialLinks: { platform: string; href: string }[];
  newsletter: { privacyLinkHref: string };
  media: { href: string };
  legalLinks: LinkLike[];
}): ChromeLink[] {
  return [
    { where: "Logo destination", href: content.logoHref },
    ...content.navColumns.flatMap((col) =>
      col.links.map((item, i) => ({ where: describe(`Column "${col.title}" link`, item, i), href: item.href })),
    ),
    ...content.socialLinks.map((s) => ({ where: `${socialPlatform(s.platform)?.label ?? s.platform} profile`, href: s.href })),
    { where: "Newsletter privacy link", href: content.newsletter.privacyLinkHref },
    { where: "Media feature link", href: content.media.href },
    ...content.legalLinks.map((item, i) => ({ where: describe("Legal link", item, i), href: item.href })),
  ];
}

export function collectChromeLinks(type: string, content: unknown): ChromeLink[] {
  if (!content || typeof content !== "object") return [];
  try {
    if (type === "navbar") return collectNavbarLinks(content as Parameters<typeof collectNavbarLinks>[0]);
    if (type === "footer") return collectFooterLinks(content as Parameters<typeof collectFooterLinks>[0]);
  } catch {
    // Partially filled editor values; the schema reports the missing fields.
  }
  return [];
}

export function isDeadInternalLink(href: string, livePaths: ReadonlySet<string>): boolean {
  const path = internalPath(href);
  return path !== null && !livePaths.has(path) && !CODE_OWNED_ROUTES.has(path);
}

/** Same-site links whose page is neither published, a redirect source, nor code-owned. */
export function findDeadInternalLinks(
  links: readonly ChromeLink[],
  livePaths: ReadonlySet<string>,
): ChromeLink[] {
  return links.filter((link) => isDeadInternalLink(link.href, livePaths));
}
