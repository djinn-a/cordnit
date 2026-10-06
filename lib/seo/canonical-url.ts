import { slugToPath, type PublishedPageDocument } from "@/lib/cms/document";
import { PRODUCTION_SITE_URL } from "@/lib/seo/site";

/** Keep canonical signals on Cordinit's production origin, including local builds and previews. */
export function getPageCanonicalUrl(doc: Pick<PublishedPageDocument, "slug" | "seo">): string {
  const path = slugToPath(doc.slug);
  const configured = typeof doc.seo?.canonical === "string" ? doc.seo.canonical.trim() : "";

  try {
    const candidate = new URL(configured || path, PRODUCTION_SITE_URL);
    if (candidate.protocol !== "https:" && candidate.protocol !== "http:") {
      return new URL(path, PRODUCTION_SITE_URL).toString();
    }
    return new URL(`${candidate.pathname}${candidate.search}${candidate.hash}`, PRODUCTION_SITE_URL).toString();
  } catch {
    return new URL(path, PRODUCTION_SITE_URL).toString();
  }
}
