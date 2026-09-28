import { useCallback } from "react";
import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { useNewsletterModal } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { bindCta, type Cta } from "@/lib/cta";

export function useCtaAction(cta: Cta, analyticsContext?: string) {
  const { openModal: onContactModal } = useContactModal();
  const { openModal: onNewsletterModal } = useNewsletterModal();

  const onScrollTo = useCallback((anchor: string) => {
    try {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    } catch {
      console.warn("Invalid scroll target:", anchor);
    }
  }, []);

  return bindCta(cta, {
    onContactModal: () => {
      if (analyticsContext) {
        // Optional placeholder for future analytics dispatch
      }
      onContactModal();
    },
    onNewsletterModal: () => {
      onNewsletterModal();
    },
    onScrollTo,
  });
}
