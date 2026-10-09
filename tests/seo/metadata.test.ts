import { describe, expect, it } from "vitest";
import type { PublishedPageDocument, SiteSeo } from "@/lib/cms/document";
import { buildPageMetadata, buildSiteMetadata } from "@/lib/seo/page-metadata";
import { buildRobots } from "@/lib/seo/robots";
import { DEFAULT_SITE_SEO, SYSTEM_DISALLOW, mergeSiteSeo } from "@/lib/seo/site";
import { buildPageJsonLd } from "@/lib/seo/structured-data";

const SUPA = "https://abc.supabase.co/storage/v1/object/public/website-assets/seo";

function doc(seo: PublishedPageDocument["seo"] = {}): PublishedPageDocument {
  return {
    pageId: "p1",
    slug: "cybersecurity",
    title: "Cybersecurity",
    shell: "default",
    spacing: "default",
    seo,
    breadcrumbs: [],
    sections: [],
    version: 1,
    publishedAt: "2026-10-01T00:00:00.000Z",
  };
}

const site: SiteSeo = mergeSiteSeo({
  siteName: "Acme",
  titleTemplate: "%s — Acme",
  defaultDescription: "Default description.",
  defaultOgImage: { url: `${SUPA}/default.jpg`, width: 1200, height: 630 },
  twitterHandle: "@acme",
});

describe("buildPageMetadata", () => {
  it("falls back to the site template, default description and default image", () => {
    const m = buildPageMetadata(doc(), site);
    expect(m.title).toEqual({ absolute: "Cybersecurity — Acme" });
    expect(m.description).toBe("Default description.");
    expect(m.openGraph?.title).toBe("Cybersecurity — Acme");
    expect(m.openGraph?.images).toEqual([{ url: `${SUPA}/default.jpg`, width: 1200, height: 630, alt: "Acme" }]);
    expect(m.twitter).toMatchObject({ site: "@acme", card: "summary_large_image" });
    expect(m.keywords).toBeUndefined();
    expect(m.robots).toBeUndefined();
  });

  it("prefers page SEO, then social overrides", () => {
    const m = buildPageMetadata(
      doc({
        title: "Security | Acme",
        description: "Page description.",
        ogTitle: "Share title",
        ogDescription: "Share description.",
        ogImage: { url: `${SUPA}/page.jpg`, alt: "Team at work" },
        keywords: [" security ", ""],
      }),
      site,
    );
    expect(m.title).toEqual({ absolute: "Security | Acme" });
    expect(m.description).toBe("Page description.");
    expect(m.openGraph).toMatchObject({ title: "Share title", description: "Share description." });
    expect(m.openGraph?.images).toEqual([{ url: `${SUPA}/page.jpg`, alt: "Team at work" }]);
    expect(m.keywords).toEqual(["security"]);
  });

  it("social fields fall back to the SEO title and description", () => {
    const m = buildPageMetadata(doc({ title: "T", description: "D" }), site);
    expect(m.openGraph).toMatchObject({ title: "T", description: "D" });
  });

  it("noindexes when the page or the whole site is hidden", () => {
    expect(buildPageMetadata(doc({ noindex: true }), site).robots).toEqual({ index: false, follow: false });
    const hidden = mergeSiteSeo({ robots: { discourageAll: true, extraDisallow: [] } });
    expect(buildPageMetadata(doc(), hidden).robots).toEqual({ index: false, follow: false });
    expect(buildSiteMetadata(hidden).robots).toEqual({ index: false, follow: false });
  });
});

describe("mergeSiteSeo", () => {
  it("returns code defaults for an empty or missing row", () => {
    expect(mergeSiteSeo(null)).toEqual(DEFAULT_SITE_SEO);
    expect(mergeSiteSeo({})).toEqual(DEFAULT_SITE_SEO);
  });

  it("ignores blanks and templates without %s", () => {
    const m = mergeSiteSeo({ siteName: "  ", titleTemplate: "No placeholder" });
    expect(m.siteName).toBe(DEFAULT_SITE_SEO.siteName);
    expect(m.titleTemplate).toBe(DEFAULT_SITE_SEO.titleTemplate);
  });
});

describe("buildRobots", () => {
  it("always blocks system paths and merges extra ones", () => {
    const r = buildRobots(mergeSiteSeo({ robots: { discourageAll: false, extraDisallow: ["/drafts/", "/admin"] } }));
    expect(r.rules).toEqual({ userAgent: "*", allow: "/", disallow: [...SYSTEM_DISALLOW, "/drafts/"] });
    expect(r.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("blocks everything and drops the sitemap when discouraged", () => {
    const r = buildRobots(mergeSiteSeo({ robots: { discourageAll: true, extraDisallow: [] } }));
    expect(r).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });
});

describe("buildPageJsonLd", () => {
  it("adds organization logo, sameAs and the page image", () => {
    const withOrg = mergeSiteSeo({
      organization: { legalName: "Acme Ltd", logo: { url: "/logo.png" }, sameAs: ["https://linkedin.com/company/acme"] },
    });
    const ld = buildPageJsonLd(doc({ ogImage: { url: `${SUPA}/page.jpg` } }), withOrg);
    const graph = ld["@graph"] as Record<string, unknown>[];
    expect(graph[0]).toMatchObject({
      legalName: "Acme Ltd",
      logo: { "@type": "ImageObject", url: "https://cordinit.com/logo.png" },
      sameAs: ["https://linkedin.com/company/acme"],
    });
    expect(graph.find((n) => n["@type"] === "WebPage")).toMatchObject({
      primaryImageOfPage: { url: `${SUPA}/page.jpg` },
    });
  });
});
