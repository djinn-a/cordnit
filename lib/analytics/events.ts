// The event map is the shared contract used by UI callers and future analytics adapters.
export const ANALYTICS_EVENT_NAMES = [
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
] as const;

export type BookCallLocation = string;
type PageContext = { page?: string };

export type AnalyticsEventMap = {
  page_view: { page: string };
  content_link_click: {
    page: string;
    section: string;
    link_text: string;
    destination: string;
  };
  content_action_click: {
    page: string;
    section: string;
    action: string;
  };
  book_call_click: { location: BookCallLocation } & PageContext;
  contact_form_view: { location: "contact-modal" | "contact-page" } & PageContext;
  contact_form_start: { location: "contact-modal" | "contact-page" } & PageContext;
  contact_form_submit: { location: "contact-modal" | "contact-page" } & PageContext;
  contact_form_success: { location: "contact-modal" | "contact-page" } & PageContext;
  contact_form_error: { location: "contact-modal" | "contact-page" } & PageContext;
  solution_explore: { location: "home-hero" } & PageContext;
  industry_explore: { location: "industry-card" } & PageContext;
  accelerator_explore: PageContext;
  insight_read: { location: "insight-card" | "featured-insight" } & PageContext;
  newsletter_view: { location: "newsletter-modal" | "newsletter-footer" | "newsletter-section" } & PageContext;
  newsletter_start: { location: "newsletter-modal" | "newsletter-footer" | "newsletter-section" } & PageContext;
  newsletter_submit: { location: "newsletter-modal" | "newsletter-footer" | "newsletter-section" } & PageContext;
  newsletter_success: { location: "newsletter-modal" | "newsletter-footer" | "newsletter-section" } & PageContext;
};

export type AnalyticsEventName = keyof AnalyticsEventMap;
