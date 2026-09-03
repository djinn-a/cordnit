import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0A82B5",
          border: "#8BBDD6",
          light: "#C9DDF5",
          pale: "#E8F0F8",
        },
        footer: {
          icon: "#1c1c1c",
        },
      },
      fontSize: {
        'hero-title': '1.35rem',
        'section-subtitle': '0.65rem',
        'section-subtitle-sm': '0.6rem',
        'section-subtitle-xs': '0.55rem',
        'body-medium': '0.85rem',
        'body-small': '0.8rem',
        'body-xs': '0.7rem',
      },
      maxWidth: {
        'container-xl': '1400px',
      },
      height: {
        'panel': '400px',
      },
      borderRadius: {
        'btn': '0.4rem',
      }
    },
  },
  plugins: [],
};

export default config;
