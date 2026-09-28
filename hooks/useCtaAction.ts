"use client";

import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { useNewsletterModal } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { bindCta, type BoundCta, type Cta } from "@/lib/cta";

function scrollToAnchor(anchor: string) {
  const target = document.getElementById(anchor.slice(1));
  if (!target) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", anchor);
}

/** `ctaLocation` is attached to leads submitted from the contact modal. */
export function useCtaAction(cta: Cta, ctaLocation?: string): BoundCta {
  const contact = useContactModal();
  const newsletter = useNewsletterModal();

  return bindCta(cta, {
    onContactModal: () => contact.openModal(ctaLocation ? { ctaLocation } : undefined),
    onNewsletterModal: () => newsletter.openModal(),
    onScrollTo: scrollToAnchor,
  });
}
