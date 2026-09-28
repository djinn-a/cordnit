import type { MouseEvent } from "react";
import type { Cta } from "./types";

export function resolveCta(cta?: Partial<Cta>): Cta {
  return {
    label: cta?.label || "Learn More",
    action: cta?.action || "link",
    href: cta?.href,
    newTab: cta?.newTab ?? false,
    variant: cta?.variant || "primary",
  };
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:");
}

export type CtaHandlers = {
  onContactModal?: () => void;
  onNewsletterModal?: () => void;
  onScrollTo?: (anchor: string) => void;
};

type BoundCta = {
  href?: string;
  onClick?: (e?: MouseEvent) => void;
  target?: string;
  rel?: string;
};

export function bindCta(cta: Cta, handlers: CtaHandlers): BoundCta {
  const { action, href, newTab } = resolveCta(cta);

  if (action === "contactModal" && handlers.onContactModal) {
    return {
      onClick: (e) => {
        e?.preventDefault();
        handlers.onContactModal!();
      },
    };
  }

  if (action === "newsletterModal" && handlers.onNewsletterModal) {
    return {
      onClick: (e) => {
        e?.preventDefault();
        handlers.onNewsletterModal!();
      },
    };
  }

  if (action === "scrollTo" && href) {
    return {
      href,
      onClick: (e) => {
        if (handlers.onScrollTo) {
          e?.preventDefault();
          handlers.onScrollTo(href);
        }
      },
    };
  }

  // default to link
  const isExternal = href ? isExternalHref(href) : false;
  const target = newTab || isExternal ? "_blank" : undefined;
  const rel = target === "_blank" ? "noopener noreferrer" : undefined;

  return {
    href,
    target,
    rel,
  };
}
