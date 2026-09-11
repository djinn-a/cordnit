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
        },
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
        footer: {
          icon: "var(--color-footer-icon)",
        },
        "pure-black": "#000000",
      },
      fontSize: {
        "mobile-tag": ["10px", { lineHeight: "14px", letterSpacing: "0.6px", fontWeight: "400" }],
        "mobile-heading": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "mobile-body": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "mobile-cta": ["14px", { lineHeight: "22px", fontWeight: "600" }],
        "mobile-subhead": ["10px", { lineHeight: "16px", letterSpacing: "1px", fontWeight: "800" }],
        "mobile-section-heading": ["24px", { lineHeight: "32px", fontWeight: "800" }],
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
      },
      boxShadow: {
        card: "var(--shadow-card)",
        focus: "var(--shadow-focus)",
        "glow-primary": "var(--shadow-glow-primary)",
      },
    },
  },
  plugins: [],
};

export default config;
