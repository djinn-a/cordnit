import type { Cta } from "@/lib/cta";
import { trackEvent } from "./index";

// Keep CMS CTA placement names mapped to stable event locations in one place.
const CTA_EVENT_LOCATIONS = [
  "home-hero-secondary",
  "industry-card",
  "insight-card",
  "featured-insight",
] as const;

type CtaEventLocation = (typeof CTA_EVENT_LOCATIONS)[number];

export function hasTrackedCtaEvent(cta: Cta, location?: string): location is CtaEventLocation {
  return cta.action === "link"
    && Boolean(cta.href)
    && location !== undefined
    && CTA_EVENT_LOCATIONS.includes(location as CtaEventLocation);
}

export function trackCtaEvent(location: CtaEventLocation) {
  switch (location) {
    case "home-hero-secondary":
      trackEvent("solution_explore", { location: "home-hero" });
      break;
    case "industry-card":
      trackEvent("industry_explore", { location: "industry-card" });
      break;
    case "insight-card":
      trackEvent("insight_read", { location: "insight-card" });
      break;
    case "featured-insight":
      trackEvent("insight_read", { location: "featured-insight" });
      break;
  }
}
