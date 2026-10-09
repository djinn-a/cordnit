import "server-only";
import { unstable_rethrow } from "next/navigation";
import { SITE_FOOTER_BLOCK_KEY, SITE_NAVBAR_BLOCK_KEY } from "@/lib/cms/document";
import type { SectionContentMap } from "@/lib/cms/registry";
import { isExternalHref } from "@/lib/cms/site-chrome";
import { FOOTER_DEFAULTS, NAVBAR_DEFAULTS } from "@/lib/cms/site-chrome-defaults";
import type { OrganizationExtras } from "@/lib/seo/structured-data";
import { FOOTER_ASSETS } from "@/components/layout/Footer/footerData";
import { logger } from "@/server/logger";
import { getPublishedBlockByKey } from "./published";

export type SiteChrome = { navbar: SectionContentMap["navbar"]; footer: SectionContentMap["footer"] };

const isBuild = () => process.env.NEXT_PHASE === "phase-production-build";

async function load<T extends "navbar" | "footer">(key: string, type: T, fallback: SectionContentMap[T]) {
  try {
    return (await getPublishedBlockByKey(key, type))?.props ?? fallback;
  } catch (err) {
    unstable_rethrow(err);
    // Failing the build beats prerendering every page with fallback chrome.
    if (isBuild()) throw err;
    logger.error(`[CMS] Could not load the site ${type}; rendering code defaults.`, { err });
    return fallback;
  }
}

/** Organization facts for structured data, managed by marketing in the Footer. */
export function organizationExtras({ navbar, footer }: SiteChrome): OrganizationExtras {
  return {
    sameAs: footer.socialLinks.map((s) => s.href).filter(isExternalHref),
    logo: footer.logo?.url || navbar.logo?.url || FOOTER_ASSETS.logo,
    email: footer.contact.email || undefined,
    telephone: footer.contact.phone || undefined,
  };
}

/** Published Navbar and Footer content, or the code defaults (with real links) when unavailable. */
export async function getSiteChrome(): Promise<SiteChrome> {
  const [navbar, footer] = await Promise.all([
    load(SITE_NAVBAR_BLOCK_KEY, "navbar", NAVBAR_DEFAULTS),
    load(SITE_FOOTER_BLOCK_KEY, "footer", FOOTER_DEFAULTS),
  ]);
  return { navbar, footer };
}
