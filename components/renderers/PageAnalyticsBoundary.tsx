"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";
import { trackContentLinkClick } from "@/lib/analytics/navigation";

type PageAnalyticsBoundaryProps = {
  pageSlug: string;
  children: ReactNode;
};

// Keeps page and CMS section click tracking in one client boundary instead of
// adding analytics handlers to every rendered section.
export default function PageAnalyticsBoundary({
  pageSlug,
  children,
}: Readonly<PageAnalyticsBoundaryProps>) {
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    // Route transitions can reuse this boundary, so only emit when its CMS slug changes.
    if (lastTrackedPage.current === pageSlug) return;
    lastTrackedPage.current = pageSlug;
    trackEvent("page_view", { page: pageSlug });
  }, [pageSlug]);

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>("a[href]");
    const button = target.closest<HTMLButtonElement>("button");
    const interactive = link ?? button;
    const section = interactive?.closest<HTMLElement>("[data-analytics-section]");
    if (!interactive || !section) return;

    const label =
      interactive.getAttribute("aria-label")?.trim() ||
      interactive.innerText.trim().replace(/\s+/g, " ") ||
      interactive.querySelector("img[alt]")?.getAttribute("alt")?.trim() ||
      interactive.title.trim() ||
      "unlabeled";
    const sectionType = section.dataset.analyticsSection ?? "unknown";

    if (link) {
      const rawHref = link.getAttribute("href")?.trim();
      // Ignore placeholder anchors; they do not represent navigation intent.
      if (!rawHref || rawHref === "#") return;
      trackContentLinkClick(pageSlug, sectionType, label, link.href);
      return;
    }

    if (button?.closest("form") || button?.getAttribute("aria-haspopup") === "dialog") return;
    trackEvent("content_action_click", {
      page: pageSlug,
      section: sectionType,
      action: label,
    });
  }

  return (
    <div className="contents" onClickCapture={handleClickCapture}>
      {children}
    </div>
  );
}
