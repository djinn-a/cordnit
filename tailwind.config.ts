import type { Config } from "tailwindcss";
import { baseTheme, extendedTheme } from "./tailwind/tokens";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    ...baseTheme,
    extend: {
      ...extendedTheme,
    },
  },
  plugins: [],
};

export default config;