import type { PublishedPageDocument } from "@/lib/cms/document";
import { getPageCanonicalUrl } from "@/lib/seo/canonical-url";
import { PRODUCTION_SITE_URL, SITE_NAME } from "@/lib/seo/site";

type JsonLd = Record<string, unknown>;

function productionUrl(value: unknown, forceProductionOrigin = false): string | undefined {
  if (typeof value !== "string" || !value.trim()) return;
  try {
    const url = new URL(value, PRODUCTION_SITE_URL);
    if (url.protocol !== "https:" && url.protocol !== "http:") return;
    if (!forceProductionOrigin && url.origin !== PRODUCTION_SITE_URL) return;
    return new URL(`${url.pathname}${url.search}${url.hash}`, PRODUCTION_SITE_URL).toString();
  } catch {
    return;
  }
}

function breadcrumbList(items: unknown, pageUrl: string): JsonLd | undefined {
  if (!Array.isArray(items) || !items.length) return;
  const itemListElement: JsonLd[] = [];

  for (const [index, item] of (items as unknown[]).entries()) {
    if (!item || typeof item !== "object") return;
    const crumb = item as Record<string, unknown>;
    const name = typeof crumb.label === "string" ? crumb.label.trim() : "";
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

export function buildPageJsonLd(
  doc: PublishedPageDocument | null | undefined,
  canonicalUrl?: string,
): JsonLd {
  const seo = doc?.seo ?? {};
  const pageUrl =
    productionUrl(canonicalUrl, true) ??
    (doc ? getPageCanonicalUrl(doc) : `${PRODUCTION_SITE_URL}/`);
  const graph: JsonLd[] = [
    {
      "@type": "Organization",
      "@id": `${PRODUCTION_SITE_URL}/#organization`,
      name: SITE_NAME,
      url: PRODUCTION_SITE_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${PRODUCTION_SITE_URL}/#website`,
      url: PRODUCTION_SITE_URL,
      name: SITE_NAME,
      publisher: { "@id": `${PRODUCTION_SITE_URL}/#organization` },
    },
  ];

  const title = typeof doc?.title === "string" ? doc.title.trim() : "";
  if (doc && title) {
    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      ...(typeof seo.description === "string" && seo.description.trim()
        ? { description: seo.description.trim() }
        : {}),
      ...(typeof doc.publishedAt === "string" && Number.isFinite(Date.parse(doc.publishedAt))
        ? { datePublished: new Date(doc.publishedAt).toISOString() }
        : {}),
      isPartOf: { "@id": `${PRODUCTION_SITE_URL}/#website` },
    });
  }

  const breadcrumbs = breadcrumbList(doc?.breadcrumbs, pageUrl);
  if (breadcrumbs) graph.push(breadcrumbs);
  return { "@context": "https://schema.org", "@graph": graph };
}
