import type { Config } from "tailwindcss";

type ScreensConfig = NonNullable<Config["theme"]>["screens"];
type MaxWidthConfig = NonNullable<Config["theme"]>["maxWidth"];
type WidthConfig = NonNullable<Config["theme"]>["width"];
type HeightConfig = NonNullable<Config["theme"]>["height"];
type InsetConfig = NonNullable<Config["theme"]>["inset"];
type AspectRatioConfig = NonNullable<Config["theme"]>["aspectRatio"];

export const screens: ScreensConfig = {
  xs: "360px",
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
};

export const maxWidth: MaxWidthConfig = {
  container: "80rem",
  "container-xl": "1400px",
  "container-1440": "1440px",
  "container-2xl": "1600px",
  "container-wide": "1800px",
  "media-wrap": "600px",
};

export const width: WidthConfig = {
  "cta-button": "296px",
  "media-main": "236px",
  "media-sec": "153px",
};

export const height: HeightConfig = {
  panel: "400px",
};

export const inset: InsetConfig = {
  "media-sec": "114px",
};

export const aspectRatio: AspectRatioConfig = {
  "media-wrap": "600 / 484",
  "media-main": "454 / 420",
  "media-sec": "256 / 240",
};
