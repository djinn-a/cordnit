import { afterEach, describe, expect, it, vi } from "vitest";
import { ANALYTICS_EVENT_NAMES, trackEvent } from "@/lib/analytics";
import { logAnalyticsEvent } from "@/lib/analytics/console-adapter";

// Keep representative calls here so TypeScript checks the event/payload contract at build time.
const verifyEventTypes = () => {
  trackEvent("book_call_click", { location: "solutions" });
  trackEvent("accelerator_explore", {});
  // @ts-expect-error Unknown event names must be rejected.
  trackEvent("unknown_event", {});
  // CMS-backed pages use their route slug as the location.
  trackEvent("book_call_click", { location: "aboutus" });
  // @ts-expect-error Unrelated payload properties are not allowed.
  trackEvent("book_call_click", { location: "hero", unrelated_parameter: true });
  // @ts-expect-error Empty event payloads reject arbitrary properties.
  trackEvent("accelerator_explore", { location: "navbar" });
};
void verifyEventTypes;

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("analytics tracking", () => {
  it("defines the required event names", () => {
    expect(ANALYTICS_EVENT_NAMES).toEqual([
      "page_view",
      "content_link_click",
      "content_action_click",
      "book_call_click",
      "contact_form_view",
      "contact_form_start",
      "contact_form_submit",
      "contact_form_success",
      "contact_form_error",
      "solution_explore",
      "industry_explore",
      "accelerator_explore",
      "insight_read",
      "newsletter_view",
      "newsletter_start",
      "newsletter_submit",
      "newsletter_success",
    ]);
  });

  it("does not log analytics events to the console", () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.stubEnv("NODE_ENV", "development");
    trackEvent("book_call_click", { location: "solutions" });
    expect(info).not.toHaveBeenCalled();

    vi.stubEnv("NODE_ENV", "production");
    logAnalyticsEvent("newsletter_success", { location: "newsletter-footer" });
    expect(info).not.toHaveBeenCalled();
  });

  it("does not throw if the adapter fails", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.spyOn(console, "info").mockImplementation(() => {
      throw new Error("console unavailable");
    });
    expect(() => trackEvent("contact_form_submit", { location: "contact-page" })).not.toThrow();
  });
});
