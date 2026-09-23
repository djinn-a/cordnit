import type { Config } from "tailwindcss";

type FontFamilyConfig = NonNullable<Config["theme"]>["fontFamily"];
type FontSizeConfig = NonNullable<Config["theme"]>["fontSize"];

export const fontFamily: FontFamilyConfig = {
  sans: ["var(--font-mulish)", "sans-serif"],
  mulish: ["var(--font-mulish)", "sans-serif"],
};

export const fontSize: FontSizeConfig = {
  "hero-header-eb": ["56px", { fontWeight: "800", lineHeight: "1.25" }],
  "section-title": ["48px", { fontWeight: "800", lineHeight: "1.2" }],
  "section-title-mobile": ["24px", { fontWeight: "800", lineHeight: "1.2" }],
  "section-subtitle": ["20px", { fontWeight: "400", lineHeight: "1.5" }],
  "section-subtitle-mobile": ["14px", { fontWeight: "400", lineHeight: "1.5" }],
  "card-title": ["32px", { fontWeight: "700", lineHeight: "1.2" }],
  "card-title-desktop": ["24px", { fontWeight: "600", lineHeight: "1.2" }],
  "card-title-mobile": ["20px", { fontWeight: "800", lineHeight: "1.2" }],
  "card-desc": ["16px", { fontWeight: "400", lineHeight: "1.5" }],
  "card-desc-mobile": ["12px", { fontWeight: "400", lineHeight: "1.5" }],
  "eyebrow-mobile": ["10px", { fontWeight: "800", lineHeight: "1.5" }],
  "eyebrow-desktop": ["16px", { fontWeight: "600", lineHeight: "1", letterSpacing: "1px" }],
  "link-mobile": ["14px", { fontWeight: "600", lineHeight: "1.5" }],
  "link-desktop": ["16px", { fontWeight: "600", lineHeight: "1.5" }],
  "cta-title-mobile": ["24px", { fontWeight: "700", lineHeight: "1.2" }],
  "cta-title-desktop": ["32px", { fontWeight: "700", lineHeight: "1.2" }],
  "cta-expert-desktop": ["16px", { fontWeight: "400", lineHeight: "1.25" }],
  "footer-heading-desktop": ["12px", { fontWeight: "700", lineHeight: "1.5" }],
  "footer-media-heading-desktop": ["24px", { fontWeight: "400", lineHeight: "1.3" }],
  "footer-media-cta-desktop": ["14px", { fontWeight: "600", lineHeight: "1.5" }],
  "help-card-title": ["24px", { fontWeight: "600", lineHeight: "1.333" }],
  "help-card-title-mobile": ["20px", { fontWeight: "600", lineHeight: "1.4" }],
  "help-card-title-desktop": ["20px", { fontWeight: "700", lineHeight: "1.2" }], 
  "help-card-prefix": ["12px", { fontWeight: "600", lineHeight: "1.5", letterSpacing: "1px" }],
  "help-card-prefix-mobile": ["12px", { fontWeight: "600", lineHeight: "1.5", letterSpacing: "1px" }],
  "help-card-prefix-blue-mobile": ["12px", { fontWeight: "400", lineHeight: "1.5", letterSpacing: "1px" }],
  "help-card-desc-mobile": ["14px", { fontWeight: "400", lineHeight: "1.5" }],
  "numbers": ["80px", { fontWeight: "700", lineHeight: "1.5" }],
  "numbers-mobile": ["48px", { fontWeight: "700", lineHeight: "1.5" }],
  "section-title-head-mobile": ["14px", { fontWeight: "700", lineHeight: "1.571" }],
  "section-title-head": ["24px", { fontWeight: "600", lineHeight: "1.333" }],
  "section-title-h": ["18px", { fontWeight: "400", lineHeight: "1.5" }],
  "link-card-mobile": ["10px", { fontWeight: "600", lineHeight: "1.5" }],
  "card-detail-mobile": ["10px", { fontWeight: "400", lineHeight: "1.5" }],
  "stat-desc-mobile": ["10px", { fontWeight: "400", lineHeight: "1.4" }],
  "cta-text2-sb-mobile": ["10px", { fontWeight: "600", lineHeight: "1.4" }],
  "heading2-sb-mobile": ["16px", { fontWeight: "600", lineHeight: "1.5" }],
  "about-eyebrow-desktop": ["12px", { fontWeight: "600", lineHeight: "1.5" }],
  "page-hero-title": ["56px", { fontWeight: "800", lineHeight: "1.25", letterSpacing: "0px" }],
  "page-hero-subtitle": ["20px", { fontWeight: "400", lineHeight: "1.4", letterSpacing: "0px" }],
  "page-hero-eyebrow": ["16px", { fontWeight: "600", lineHeight: "1", letterSpacing: "1px" }],
  "split-section-title": ["48px", { fontWeight: "800", lineHeight: "1.417", letterSpacing: "0px" }],
};
