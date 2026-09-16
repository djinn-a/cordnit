"use client";

import React from "react";
import { Button } from "@/components/ui";
import { NEWSLETTER_CAPTURE_ENABLED } from "@/lib/features/newsletter";
import { FOOTER_NEWSLETTER } from "../data/footerData";
import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { defaultNewsletterContent } from "@/components/features/newsletter/NewsletterModal/newsletterContent";

export default function FooterNewsletter() {
  const { openModal } = useContactModal();
  const { comingSoon, form } = defaultNewsletterContent;

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
      <div className="flex flex-col max-w-70">
        <h4 className="text-ink text-h4 mb-1 max-lg:text-link-mobile">{FOOTER_NEWSLETTER.heading}</h4>
        <p className="text-ink-muted text-card-desc max-lg:text-section-subtitle-mobile">
          {!NEWSLETTER_CAPTURE_ENABLED ? comingSoon.footerNote : FOOTER_NEWSLETTER.description}
        </p>
      </div>
      {!NEWSLETTER_CAPTURE_ENABLED ? (
        <Button
          type="button"
          variant="primary"
          size="md"
          className="max-lg:text-link-mobile"
          onClick={() => openModal({ ctaLocation: "Footer Newsletter" })}
        >
          {comingSoon.footerCta}
        </Button>
      ) : (
        <form
          className="flex w-full lg:w-auto gap-2 lg:gap-3"
          aria-label="Newsletter subscription form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={FOOTER_NEWSLETTER.placeholder}
            aria-label="Work email address"
            required
            className="border border-border-subtle rounded-btn px-3 lg:px-4 py-2.5 text-body-sm max-lg:text-card-detail-mobile flex-1 lg:flex-none lg:w-60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm min-w-0"
          />
          <Button type="submit" variant="primary" size="md" className="max-lg:text-link-card-mobile">
            {form.buttonText}
          </Button>
        </form>
      )}
    </div>
  );
}
