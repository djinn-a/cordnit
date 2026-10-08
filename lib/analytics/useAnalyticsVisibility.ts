"use client";

import { useEffect, useMemo, useRef } from "react";
import { trackEvent } from "./index";
import type { AnalyticsEventMap } from "./events";

type ViewEvent = "contact_form_view" | "newsletter_view";

// Emit a view event on first visibility, not on mount when the form may be below the fold.
export function useAnalyticsVisibility<E extends ViewEvent>(
  eventName: E,
  payload: AnalyticsEventMap[E],
) {
  const formRef = useRef<HTMLFormElement>(null);
  const hasTracked = useRef(false);
  const { location } = payload;
  const stablePayload = useMemo(() => ({ location }) as AnalyticsEventMap[E], [location]);

  useEffect(() => {
    const form = formRef.current;
    if (!form || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!hasTracked.current && entry?.isIntersecting) {
        hasTracked.current = true;
        trackEvent(eventName, stablePayload);
        observer.disconnect();
      }
    });
    observer.observe(form);
    return () => observer.disconnect();
  }, [eventName, stablePayload]);

  return formRef;
}
