import type { ThemeConfig } from "antd";

/** Brand tokens mirrored from app/globals.css so the CMS feels like the site it edits. */
export const BRAND = {
  primary: "#2251ff",
  primaryHover: "#1a42e0",
  primaryPale: "#eef4ff",
  surfaceDark: "#0a1122",
  surfaceDarker: "#050811",
  ink: "#000000",
  inkMuted: "#555555",
  border: "#e5e7eb",
  borderCard: "#dce6f5",
  success: "#00b050",
  error: "#ef4444",
  warning: "#f59e0b",
  gradientNav: "linear-gradient(90deg, #2251ff 0%, #040a14 100%)",
} as const;

export const cmsTheme: ThemeConfig = {
  cssVar: { key: "cms" },
  hashed: false,
  token: {
    colorPrimary: BRAND.primary,
    colorInfo: BRAND.primary,
    colorLink: BRAND.primary,
    colorSuccess: BRAND.success,
    colorError: BRAND.error,
    colorWarning: BRAND.warning,
    colorTextBase: "#0b0f19",
    colorBorder: BRAND.border,
    colorBgLayout: "#f5f7fb",
    borderRadius: 8,
    borderRadiusLG: 12,
    fontFamily: "var(--font-mulish), system-ui, -apple-system, 'Segoe UI', sans-serif",
    fontSize: 14,
    controlHeight: 36,
  },
  components: {
    Layout: {
      siderBg: BRAND.surfaceDark,
      triggerBg: BRAND.surfaceDarker,
      headerBg: "#ffffff",
      headerHeight: 56,
      headerPadding: "0 24px",
    },
    Menu: {
      darkItemBg: BRAND.surfaceDark,
      darkSubMenuItemBg: BRAND.surfaceDarker,
      darkItemSelectedBg: BRAND.primary,
      itemBorderRadius: 8,
    },
    Button: { fontWeight: 600, primaryShadow: "0 2px 0 rgba(34, 81, 255, 0.12)" },
    Card: { borderRadiusLG: 12 },
    Table: { headerBg: "#f8fafc", rowHoverBg: BRAND.primaryPale },
  },
};
