import { describe, expect, it } from "vitest";
import { isAllowedSeoImageUrl, seoSchema, siteSeoSchema } from "@/lib/cms/inputs";
import { DEFAULT_SITE_SEO } from "@/lib/seo/site";

describe("isAllowedSeoImageUrl", () => {
  it.each([
    "https://abc.supabase.co/storage/v1/object/public/website-assets/seo/x.jpg",
    "/images/og/default.jpg",
  ])("allows %s", (url) => expect(isAllowedSeoImageUrl(url)).toBe(true));

  it.each([
    "http://abc.supabase.co/storage/v1/object/public/a.jpg",
    "https://evil.example.com/storage/v1/object/public/a.jpg",
    "https://abc.supabase.co/storage/v1/object/sign/a.jpg",
    "//evil.example.com/a.jpg",
    "javascript:alert(1)",
  ])("rejects %s", (url) => expect(isAllowedSeoImageUrl(url)).toBe(false));
});

describe("seoSchema social fields", () => {
  it("accepts valid social fields", () => {
    const r = seoSchema.safeParse({ ogTitle: "T", ogDescription: "D", ogImage: { url: "/og.jpg", width: 1200, height: 630 }, keywords: ["a"] });
    expect(r.success).toBe(true);
  });

  it.each([
    [{ ogTitle: "x".repeat(96) }],
    [{ ogDescription: "x".repeat(201) }],
    [{ keywords: Array.from({ length: 11 }, (_, i) => `k${i}`) }],
    [{ ogImage: { url: "https://example.com/a.jpg" } }],
  ])("rejects %j", (input) => expect(seoSchema.safeParse(input).success).toBe(false));
});

describe("siteSeoSchema", () => {
  it("accepts the code defaults", () => expect(siteSeoSchema.safeParse(DEFAULT_SITE_SEO).success).toBe(true));

  it("normalises the twitter handle", () => {
    const r = siteSeoSchema.parse({ ...DEFAULT_SITE_SEO, twitterHandle: "cordinit" });
    expect(r.twitterHandle).toBe("@cordinit");
  });

  it.each([
    [{ titleTemplate: "No placeholder" }],
    [{ siteName: "" }],
    [{ defaultDescription: "x".repeat(171) }],
    [{ organization: { sameAs: ["http://insecure.example.com"] } }],
    [{ robots: { discourageAll: false, extraDisallow: ["no-slash"] } }],
  ])("rejects %j", (patch) => expect(siteSeoSchema.safeParse({ ...DEFAULT_SITE_SEO, ...patch }).success).toBe(false));
});
