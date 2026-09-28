import type { MouseEvent } from "react";
import type { Cta } from "./types";

export type CtaHandlers = {
  onContactModal: () => void;
  onNewsletterModal: () => void;
  onScrollTo: (anchor: string) => void;
};

export type BoundCta = {
  href?: string;
  target?: "_blank";
  rel?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

/** Maps a CTA to the props an anchor or button needs; pure so it is testable outside React. */
export function bindCta(cta: Cta, handlers: CtaHandlers): BoundCta {
  switch (cta.action) {
    case "contactModal":
      return { onClick: () => handlers.onContactModal() };
    case "newsletterModal":
      return { onClick: () => handlers.onNewsletterModal() };
    case "scrollTo": {
      const anchor = cta.href;
      if (!anchor) return {};
      return {
        href: anchor,
        onClick: (event) => {
          event.preventDefault();
          handlers.onScrollTo(anchor);
        },
      };
    }
    default:
      if (!cta.href) return {};
      return cta.newTab ? { href: cta.href, target: "_blank", rel: "noopener noreferrer" } : { href: cta.href };
  }
}
