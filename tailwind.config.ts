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
      se: "375px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      fontSize: {
        "12px": "12px",
        "14px": "14px",
        "16px": "16px",
        "20px": "20px",
        "24px": "24px",
        "48px": "48px",
      },
      fontWeight: {
        "400": "400",
        "600": "600",
        "700": "700",
        "800": "800",
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
