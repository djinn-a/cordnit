import { describe, expect, it } from "vitest";
import snapshot from "@/server/db/seed/snapshot.json";
import { slugToPath } from "@/lib/cms/document";
import { sectionContentSchemas } from "@/lib/cms/registry";
import {
  collectChromeLinks,
  findDeadInternalLinks,
  internalPath,
  isSafeChromeHref,
} from "@/lib/cms/site-chrome";
import { FOOTER_DEFAULTS, NAVBAR_DEFAULTS } from "@/lib/cms/site-chrome-defaults";
import { buildLlmsTxt } from "@/lib/seo/llms-txt";
import { DEFAULT_SITE_SEO } from "@/lib/seo/site";
import { buildPageJsonLd } from "@/lib/seo/structured-data";

const seededPaths = new Set((snapshot as { pages: { slug: string }[] }).pages.map((p) => slugToPath(p.slug)));

describe("site chrome links", () => {
  it.each([
    ["", true],
    ["/about", true],
    ["#contact", true],
    ["https://example.com/x", true],
    ["mailto:hi@cordinit.com", true],
    ["tel:+911234567", true],
    ["//evil.com", false],
    ["/\\evil", false],
    ["javascript:alert(1)", false],
    ["http://insecure.com", false],
  ])("isSafeChromeHref(%j) -> %s", (href, ok) => {
    expect(isSafeChromeHref(href)).toBe(ok);
  });

  it("normalises internal paths case- and slash-insensitively", () => {
    expect(internalPath("/About/")).toBe("/about");
    expect(internalPath("/salesforce/Sales?x=1#top")).toBe("/salesforce/sales");
    expect(internalPath("/")).toBe("/");
    expect(internalPath("https://cordinit.com/about")).toBeNull();
    expect(internalPath("#top")).toBeNull();
  });

  it("flags only internal links without a live page", () => {
    const dead = findDeadInternalLinks(
      [
        { where: "a", href: "/aboutus" },
        { where: "b", href: "/missing" },
        { where: "c", href: "/privacy" },
        { where: "d", href: "https://x.com" },
        { where: "e", href: "" },
      ],
      new Set(["/aboutus"]),
    );
    expect(dead.map((d) => d.where)).toEqual(["b"]);
  });
});

describe("site chrome defaults", () => {
  it("pass their schemas", () => {
    expect(sectionContentSchemas.navbar.safeParse(NAVBAR_DEFAULTS).success).toBe(true);
    expect(sectionContentSchemas.footer.safeParse(FOOTER_DEFAULTS).success).toBe(true);
  });

  // The build seeds these blocks and publishing rejects links to unpublished pages.
  it("link only to seeded pages or code-owned routes", () => {
    const dead = [
      ...findDeadInternalLinks(collectChromeLinks("navbar", NAVBAR_DEFAULTS), seededPaths),
      ...findDeadInternalLinks(collectChromeLinks("footer", FOOTER_DEFAULTS), seededPaths),
    ];
    expect(dead).toEqual([]);
  });

  it("reject duplicate social platforms", () => {
    const footer = {
      ...FOOTER_DEFAULTS,
      socialLinks: [
        { _id: "a", platform: "linkedin", href: "https://linkedin.com/a" },
        { _id: "b", platform: "linkedin", href: "https://linkedin.com/b" },
      ],
    };
    expect(sectionContentSchemas.footer.safeParse(footer).success).toBe(false);
  });

  it("require alt text on uploaded images", () => {
    const url = "https://abc.supabase.co/storage/v1/object/public/website-assets/chrome/logos/x.svg";
    expect(sectionContentSchemas.navbar.safeParse({ ...NAVBAR_DEFAULTS, logo: { url, alt: "" } }).success).toBe(false);
    expect(sectionContentSchemas.navbar.safeParse({ ...NAVBAR_DEFAULTS, logo: { url, alt: "Cordinit" } }).success).toBe(true);
    expect(sectionContentSchemas.navbar.safeParse({ ...NAVBAR_DEFAULTS, logo: { url: "https://evil.com/x.svg", alt: "x" } }).success).toBe(false);
  });
});

describe("organization structured data", () => {
  it("merges footer profiles and contact details, with site settings first", () => {
    const site = { ...DEFAULT_SITE_SEO, organization: { sameAs: ["https://www.linkedin.com/company/143430041/"] } };
    const ld = buildPageJsonLd(null, site, undefined, {
      sameAs: ["https://www.linkedin.com/company/143430041/", "https://www.youtube.com/@Cordinit"],
      email: "hello@cordinit.com",
      telephone: "+91 98765 43210",
    }) as { "@graph": Record<string, unknown>[] };
    const org = ld["@graph"].find((n) => n["@type"] === "Organization")!;
    expect(org.sameAs).toEqual(["https://www.linkedin.com/company/143430041/", "https://www.youtube.com/@Cordinit"]);
    expect(org.contactPoint).toMatchObject({ "@type": "ContactPoint", email: "hello@cordinit.com", telephone: "+91 98765 43210" });
  });
});

describe("llms.txt", () => {
  const pages = [
    { slug: "home", title: "Home", description: "Secure transformation.", noindex: false },
    { slug: "cybersecurity", title: "Cybersecurity", description: "Protect what matters.", noindex: false },
    { slug: "aboutus", title: "About Cordinit", noindex: false },
    { slug: "hidden", title: "Hidden", noindex: true },
    { slug: "orphan", title: "Orphan page", noindex: false },
  ];
  const text = buildLlmsTxt({ site: DEFAULT_SITE_SEO, navbar: NAVBAR_DEFAULTS, footer: FOOTER_DEFAULTS, pages });

  it("groups pages by navigation and lists each page once", () => {
    expect(text).toMatch(/^# Cordinit\n\n> /);
    expect(text).toContain("## Solutions");
    expect(text).toContain("- [Cybersecurity](https://cordinit.com/cybersecurity): Protect what matters.");
    expect(text).toContain("- [About](https://cordinit.com/aboutus)");
    expect(text).toContain("## Other pages");
    expect(text).toContain("[Orphan page](https://cordinit.com/orphan)");
    expect(text.match(/cordinit\.com\/cybersecurity\)/g)).toHaveLength(1);
  });

  it("omits noindex pages", () => {
    expect(text).not.toContain("/hidden");
  });
});
