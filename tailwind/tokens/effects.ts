import type { Config } from "tailwindcss";

type BoxShadowConfig = NonNullable<Config["theme"]>["boxShadow"];
type BorderRadiusConfig = NonNullable<Config["theme"]>["borderRadius"];
type BackgroundImageConfig = NonNullable<Config["theme"]>["backgroundImage"];

export const boxShadow: BoxShadowConfig = {
  card: "var(--shadow-card)",
  "card-active": "var(--shadow-card-active)",
  focus: "var(--shadow-focus)",
  "glow-primary": "var(--shadow-glow-primary)",
  "help-card": "var(--shadow-help-card)",
};

export const borderRadius: BorderRadiusConfig = {
  btn: "var(--radius-btn)",
  card: "var(--radius-card)",
  "card-sm": "var(--radius-card-sm)",
  hero: "var(--radius-card-radius)",
  "card-md": "20px",
  "card-lg": "var(--radius-card-lg)",
  "page-hero": "18px",
  "split-image": "23.56px",
  "card-grid": "15px",
  "4xl": "32px",
  "card-border-radius":"9px"
};

export const backgroundImage: BackgroundImageConfig = {
  "gradient-mobile-nav": "linear-gradient(56deg, #1645FF 0.2%, #0B1B55 39.43%, #05070D 62.49%)",
  "grad-3": "linear-gradient(102deg, rgba(164, 183, 255, 0.20) 0%, rgba(142, 163, 240, 0.20) 23.47%, rgba(20, 49, 153, 0) 109.89%)",
  "cutout-curve": "radial-gradient(circle at top right, transparent 20px, var(--color-surface) 0)",
};
