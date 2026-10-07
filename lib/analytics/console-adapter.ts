import type { AnalyticsEventMap, AnalyticsEventName } from "./events";

// Development visibility only; production analytics providers belong behind this adapter.
export function logAnalyticsEvent<E extends AnalyticsEventName>(
  eventName: E,
  payload: AnalyticsEventMap[E],
) {
  if (process.env.NODE_ENV !== "development") return;
  console.info(`[Analytics] ${eventName}`, payload);
}
