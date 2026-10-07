import { trackEvent } from "./index";
import { pathSegmentsToSlug } from "@/lib/cms/document";

// Normalize destinations before sending them so query strings cannot leak user-entered data.
export function trackContentLinkClick(
  page: string,
  section: string,
  linkText: string,
  href: string,
) {
  const destination = new URL(href, window.location.href);
  const destinationPath =
    destination.protocol === "http:" || destination.protocol === "https:"
      ? `${destination.origin === window.location.origin ? "" : destination.origin}${destination.pathname}${destination.hash}`
      : `${destination.protocol}${destination.pathname}`;

  trackEvent("content_link_click", {
    page,
    section,
    link_text: linkText || "unlabeled",
    destination: destinationPath,
  });
}

export function trackNavigationEvent(href: string, linkText: string, section: string) {
  const page =
    pathSegmentsToSlug(window.location.pathname.split("/").filter(Boolean)) ?? "unknown";
  trackContentLinkClick(page, section, linkText, href);

  if (new URL(href, window.location.href).pathname === "/accelerators") {
    trackEvent("accelerator_explore", {});
  }
}
