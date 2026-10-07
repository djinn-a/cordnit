import { logAnalyticsEvent } from "./console-adapter";
import type { AnalyticsEventMap, AnalyticsEventName } from "./events";
import { pathSegmentsToSlug } from "@/lib/cms/document";

export { ANALYTICS_EVENT_NAMES } from "./events";
export type { AnalyticsEventMap, AnalyticsEventName, BookCallLocation } from "./events";

// Central dispatch adds the current route and isolates tracking failures from UI behavior.
export function trackEvent<E extends AnalyticsEventName>(
  eventName: E,
  payload: AnalyticsEventMap[E],
) {
  try {
    const page =
      typeof window === "undefined"
        ? undefined
        : pathSegmentsToSlug(window.location.pathname.split("/").filter(Boolean)) ?? "unknown";
    const eventPayload = page ? { ...payload, page } : payload;
    logAnalyticsEvent(eventName, eventPayload as AnalyticsEventMap[E]);
  } catch {
    // Analytics must never interrupt the application flow.
  }
}
