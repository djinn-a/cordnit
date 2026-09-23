import { colors } from "./colors";
import { spacing } from "./spacing";
import { fontFamily, fontSize } from "./typography";
import { screens, maxWidth, width, height, inset, aspectRatio } from "./layout";
import { boxShadow, borderRadius, backgroundImage } from "./effects";

/**
 * Base Theme
 * These values will OVERWRITE Tailwind's default configuration.
 * Currently, only screens are overwritten.
 */
export const baseTheme = {
  screens,
};

/**
 * Extended Theme
 * These values will EXTEND Tailwind's default configuration,
 * keeping the default colors, spacing, etc. intact.
 */
export const extendedTheme = {
  colors,
  spacing,
  fontFamily,
  fontSize,
  maxWidth,
  width,
  height,
  inset,
  aspectRatio,
  boxShadow,
  borderRadius,
  backgroundImage,
};
