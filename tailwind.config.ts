import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      backgroundImage: {
        "gradient-mobile-nav": "linear-gradient(56deg, #1645FF 0.2%, #0B1B55 39.43%, #05070D 62.49%)",
      },
      fontFamily: {
        sans: ["var(--font-mulish)", "sans-serif"],
        mulish: ["var(--font-mulish)", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          muted: "var(--color-primary-muted)",
          pale: "var(--color-primary-pale)",
          border: "var(--color-primary-border)",
        },
        brand: {
          primary: "var(--color-primary)",
          border: "var(--color-primary-border)",
          light: "var(--color-primary-muted)",
          pale: "var(--color-primary-pale)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          dark: "var(--color-surface-dark)",
          darker: "var(--color-surface-darker)",
        },
        ink: {
          DEFAULT: "var(--color-ink)",
          muted: "var(--color-ink-muted)",
          subtle: "var(--color-ink-subtle)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          card: "var(--color-border-card)",
        },
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        footer: {
          icon: "var(--color-footer-icon)",
        },
      },
      maxWidth: {
        container: "80rem",
        "container-xl": "1400px",
        "container-2xl": "1600px",
        "container-wide": "1800px",
      },
      height: {
        panel: "400px",
      },
      borderRadius: {
        btn: "var(--radius-btn)",
        card: "var(--radius-card)",
        "card-lg": "var(--radius-card-lg)",
        "4xl": "32px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        focus: "var(--shadow-focus)",
        "glow-primary": "var(--shadow-glow-primary)",
      },
      fontSize: {
        "section-title": ["48px", { fontWeight: "800", lineHeight: "1.2" }],
        "section-title-mobile": ["24px", { fontWeight: "800", lineHeight: "1.2" }],
        "section-subtitle": ["20px", { fontWeight: "400", lineHeight: "1.5" }],
        "section-subtitle-mobile": ["14px", { fontWeight: "400", lineHeight: "1.5" }],
        "card-title": ["32px", { fontWeight: "700", lineHeight: "1.2" }],
        "card-title-mobile": ["20px", { fontWeight: "800", lineHeight: "1.2" }],
        "card-desc": ["16px", { fontWeight: "400", lineHeight: "1.5" }],
        "card-desc-mobile": ["12px", { fontWeight: "400", lineHeight: "1.5" }],
        "eyebrow-mobile": ["10px", { fontWeight: "800", lineHeight: "1.5" }],
        "eyebrow-desktop": ["16px", { fontWeight: "600", lineHeight: "1.5" }],
        "link-mobile": ["14px", { fontWeight: "600", lineHeight: "1.5" }],
        "link-desktop": ["16px", { fontWeight: "600", lineHeight: "1.5" }],
        "cta-title-desktop": ["32px", { fontWeight: "700", lineHeight: "1.2" }],
        "cta-expert-desktop": ["16px", { fontWeight: "400", lineHeight: "1.25" }],
        "footer-heading-desktop": ["12px", { fontWeight: "700", lineHeight: "1.5" }],
        "footer-media-heading-desktop": ["24px", { fontWeight: "400", lineHeight: "1.3" }],
        "footer-media-cta-desktop": ["14px", { fontWeight: "600", lineHeight: "1.5" }],
        "help-card-title-desktop": ["20px", { fontWeight: "700", lineHeight: "1.2" }], 
        "numbers": ["80px", { fontWeight: "700", lineHeight: "1.5" }],
        "section-title-head-mobile": ["14px", { fontWeight: "700", lineHeight: "1.5" }],
        "section-title-head": ["24px", { fontWeight: "600", lineHeight: "1.5" }],
        "section-title-h": ["18px", { fontWeight: "400", lineHeight: "1.5" }],
        "link-card-mobile": ["10px", { fontWeight: "600", lineHeight: "1.5" }],
        "card-detail-mobile": ["10px", { fontWeight: "400", lineHeight: "1.5" }],
        "about-eyebrow-desktop": ["12px", { fontWeight: "600", lineHeight: "1.5" }],
      },
    },
  },
  plugins: [],
};

export default config;