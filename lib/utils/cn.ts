import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "body-lg",
            "body",
            "body-sm",
            "caption",
            "eyebrow",
            "button",
            "mobile-cta-1",
          ],
        },
      ],
      rounded: [
        {
          rounded: [
            "btn",
            "card",
            "card-sm",
            "hero",
            "card-md",
            "card-lg",
            "page-hero",
            "split-image",
            "card-grid",
            "4xl",
            "card-border-radius",
            "card-radius",
          ],
        },
      ],
      shadow: [
        {
          shadow: [
            "card",
            "card-active",
            "focus",
            "glow-primary",
            "help-card",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
