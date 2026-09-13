"use client";

import React from "react";
import { Button } from "@/components/ui";
import { NEWSLETTER_CAPTURE_ENABLED } from "@/lib/features/newsletter";
import { useContactModal } from "../../features/contact/ContactModal/ContactModalProvider";
import { defaultNewsletterContent } from "../../features/newsletter/NewsletterModal/newsletterContent";

export default function FooterNewsletter() {
  const { openModal } = useContactModal();
  const { comingSoon, form } = defaultNewsletterContent;

  if (!NEWSLETTER_CAPTURE_ENABLED) {
    return (
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
        <div className="flex flex-col max-w-[280px]">
          <h4 className="text-ink text-h4 mb-1">Stay Ahead</h4>
          <p className="text-ink-muted text-caption">{comingSoon.footerNote}</p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={() => openModal({ ctaLocation: "Footer Newsletter" })}
        >
          {comingSoon.footerCta}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
      <div className="flex flex-col max-w-[280px]">
        <h4 className="text-ink text-h4 mb-1">Stay Ahead</h4>
        <p className="text-ink-muted text-caption">
          Receive occasional perspectives on the technology topics that matter to you.
        </p>
      </div>
      <form
        className="flex w-full lg:w-auto gap-2 lg:gap-3"
        aria-label="Newsletter subscription form"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="email"
          placeholder="Work email"
          aria-label="Work email address"
          required
          className="border border-border-subtle rounded-btn px-3 lg:px-4 py-2.5 text-body-sm flex-1 lg:flex-none lg:w-[240px] focus:outline-none focus:ring-1 focus:ring-primary shadow-sm min-w-0"
        />
        <Button type="submit" variant="primary" size="md">
          {form.buttonText}
        </Button>
      </form>
    </div>
  );
}
