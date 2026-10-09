import type { BreadcrumbItem, PublishedPageDocument, SiteSeo } from "@/lib/cms/document";
import { getPageCanonicalUrl } from "@/lib/seo/canonical-url";
import { DEFAULT_SITE_SEO, PRODUCTION_SITE_URL } from "@/lib/seo/site";

type JsonLdValue = string | number | boolean | null | JsonLdValue[] | { [key: string]: JsonLdValue };
type JsonLd = { [key: string]: JsonLdValue };

function productionUrl(value: string | undefined, forceProductionOrigin = false): string | undefined {
  if (!value?.trim()) return;
  try {
    const url = new URL(value, PRODUCTION_SITE_URL);
    if (url.protocol !== "https:" && url.protocol !== "http:") return;
    if (!forceProductionOrigin && url.origin !== PRODUCTION_SITE_URL) return;
    return new URL(`${url.pathname}${url.search}${url.hash}`, PRODUCTION_SITE_URL).toString();
  } catch {
    return;
  }
}

function breadcrumbList(items: readonly BreadcrumbItem[] | undefined, pageUrl: string): JsonLd | undefined {
  if (!items?.length) return;
  const itemListElement: JsonLd[] = [];

  for (const [index, crumb] of items.entries()) {
    const name = crumb.label.trim();
    if (!name) return;
    const isCurrent = crumb.isCurrent === true || index === items.length - 1;
    const destination = isCurrent ? pageUrl : crumb.href;
    if (!destination || destination === "#") return;
    const itemUrl = productionUrl(destination);
    if (!itemUrl) return;
    itemListElement.push({ "@type": "ListItem", position: index + 1, name, item: itemUrl });
  }

  return { "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`, itemListElement };
}

/** Uploaded images live on Supabase; /paths resolve against production. */
function imageUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return;
  try {
    const url = new URL(value, PRODUCTION_SITE_URL);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return;
  }
}

export function buildPageJsonLd(
  doc: PublishedPageDocument | null | undefined,
  site: SiteSeo = DEFAULT_SITE_SEO,
  canonicalUrl?: string,
): JsonLd {
  const seo = doc?.seo ?? {};
  const pageUrl =
    productionUrl(canonicalUrl, true) ??
    (doc ? getPageCanonicalUrl(doc) : `${PRODUCTION_SITE_URL}/`);
  const logo = imageUrl(site.organization.logo?.url);
  const sameAs = site.organization.sameAs.filter((u) => /^https:\/\//.test(u));
  const graph: JsonLd[] = [
    {
      "@type": "Organization",
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
      name: site.siteName,
      url: PRODUCTION_SITE_URL,
      ...(site.organization.legalName ? { legalName: site.organization.legalName } : {}),
      ...(logo ? { logo: { "@type": "ImageObject", url: logo } } : {}),
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${PRODUCTION_SITE_URL}/#website`,
      url: PRODUCTION_SITE_URL,
      name: site.siteName,
      publisher: { "@id": `${PRODUCTION_SITE_URL}/#organization` },
    },
  ];
  const primaryImage = imageUrl(seo.ogImage?.url);

  const title = doc?.title.trim() ?? "";
  if (doc && title) {
    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      ...(seo.description?.trim()
        ? { description: seo.description.trim() }
        : {}),
      ...(Number.isFinite(Date.parse(doc.publishedAt))
        ? { datePublished: new Date(doc.publishedAt).toISOString() }
        : {}),
      ...(primaryImage ? { primaryImageOfPage: { "@type": "ImageObject", url: primaryImage } } : {}),
      isPartOf: { "@id": `${PRODUCTION_SITE_URL}/#website` },
    });
  }

  const breadcrumbs = breadcrumbList(doc?.breadcrumbs, pageUrl);
  if (breadcrumbs) graph.push(breadcrumbs);
  return { "@context": "https://schema.org", "@graph": graph };
}
