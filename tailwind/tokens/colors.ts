import type { Config } from "tailwindcss";

type ColorsConfig = NonNullable<Config["theme"]>["colors"];

export const colors: ColorsConfig = {
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
    watermark: "var(--color-ink-watermark)",
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
};
