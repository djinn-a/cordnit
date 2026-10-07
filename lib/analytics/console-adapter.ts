import type { AnalyticsEventMap, AnalyticsEventName } from "./events";

// Keep event logging muted until a production analytics provider is connected.
export function logAnalyticsEvent<E extends AnalyticsEventName>(
  _eventName: E,
  _payload: AnalyticsEventMap[E],
) {
  void _eventName;
  void _payload;
  // console.info(`[Analytics] ${_eventName}`, _payload);
}
