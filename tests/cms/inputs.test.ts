import { describe, expect, it } from "vitest";
import { pathSegmentsToSlug, slugToPath, slugToSegments } from "@/lib/cms/document";
import { changePasswordSchema, redirectSchema, seoSchema, slugSchema } from "@/lib/cms/inputs";
import { slugify } from "@/lib/cms/slugify";
import { emailToUsername, usernameSchema } from "@/server/auth/username";

describe("slugify", () => {
  it.each([
    ["AI & Automation", "ai-automation"],
    ["  Cloud   Security  ", "cloud-security"],
    ["Café Déjà Vu", "cafe-deja-vu"],
    ["Salesforce / Sales", "salesforce/sales"],
    ["--Hello--", "hello"],
    ["///a//b///", "a/b"],
  ])("%s -> %s", (input, expected) => expect(slugify(input)).toBe(expected));

  it("caps length at 200", () => expect(slugify("a".repeat(500))).toHaveLength(200));
});

describe("slugSchema", () => {
  it("normalises case, whitespace and slashes", () => {
    expect(slugSchema.parse("  /Salesforce/AI/ ")).toBe("salesforce/ai");
  });

  it.each(["", "has space", "UPPER_case", "a//b", "trailing-", "admin", "admin/pages", "api/x", "preview", "privacy"])(
    "rejects %j",
    (value) => expect(slugSchema.safeParse(value).success).toBe(false),
  );

  it.each(["home", "cybersecurity/cloud-security", "a1-b2/c3"])("accepts %j", (value) =>
    expect(slugSchema.safeParse(value).success).toBe(true),
  );
});

describe("slug <-> path helpers", () => {
  it("maps home to /", () => {
    expect(slugToPath("home")).toBe("/");
    expect(slugToSegments("home")).toEqual([]);
    expect(pathSegmentsToSlug(undefined)).toBe("home");
    expect(pathSegmentsToSlug([])).toBe("home");
  });

  it("decodes and lower-cases segments", () => {
    expect(pathSegmentsToSlug(["Salesforce", "AI"])).toBe("salesforce/ai");
    expect(slugToPath("salesforce/ai")).toBe("/salesforce/ai");
  });

  it("returns null for malformed percent-encoding instead of throwing", () => {
    expect(pathSegmentsToSlug(["%E0%A4%A"])).toBeNull();
  });
});

describe("other inputs", () => {
  it("limits SEO lengths and canonical format", () => {
    expect(seoSchema.safeParse({ title: "x".repeat(71) }).success).toBe(false);
    expect(seoSchema.safeParse({ canonical: "javascript:alert(1)" }).success).toBe(false);
    expect(seoSchema.safeParse({ canonical: "/about" }).success).toBe(true);
  });

  it("validates redirects and defaults to 308", () => {
    expect(redirectSchema.parse({ fromPath: "/old", toPath: "/new" }).statusCode).toBe(308);
    expect(redirectSchema.safeParse({ fromPath: "old", toPath: "/new" }).success).toBe(false);
    expect(redirectSchema.safeParse({ fromPath: "/old", toPath: "javascript:x" }).success).toBe(false);
  });

  it("requires matching, long-enough passwords", () => {
    const base = { currentPassword: "current" };
    expect(changePasswordSchema.safeParse({ ...base, newPassword: "short", confirmPassword: "short" }).success).toBe(false);
    const mismatch = changePasswordSchema.safeParse({
      ...base,
      newPassword: "long-enough-pass",
      confirmPassword: "long-enough-pasS",
    });
    expect(mismatch.error?.issues[0]?.path).toEqual(["confirmPassword"]);
  });

  it("normalises usernames", () => {
    expect(usernameSchema.parse("  SuperAdmin ")).toBe("superadmin");
    expect(usernameSchema.safeParse("bad name").success).toBe(false);
    expect(emailToUsername("superadmin@cms.local")).toBe("superadmin");
  });
});
