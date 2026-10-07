"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { FOOTER_NEWSLETTER } from "./footerData";
import { defaultNewsletterContent } from "@/components/features/newsletter/NewsletterModal/newsletterContent";
import { useAnalyticsVisibility } from "@/lib/analytics/useAnalyticsVisibility";

export default function FooterNewsletter() {
  const formRef = useAnalyticsVisibility('newsletter_view', { location: 'newsletter-footer' });
  const { form } = defaultNewsletterContent;
  const { email, consent, status, errors, submitError, honeypotProps, onEmailChange, onConsentChange, handleSubmit } =
    useNewsletterSubscribe("Footer Newsletter");
  const isSubmitting = status === "submitting";

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
      <div className="flex flex-col max-w-70">
        <h4 className="text-ink text-h4 mb-1 max-lg:text-link-mobile">{FOOTER_NEWSLETTER.heading}</h4>
        <p className="text-ink-muted text-card-desc max-lg:text-section-subtitle-mobile">
          {FOOTER_NEWSLETTER.description}
        </p>
      </div>
      {status === "success" ? (
        <p role="status" className="flex items-center gap-2 text-body-sm text-ink">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" aria-hidden="true" />
          Thanks for subscribing.
        </p>
      ) : (
        <form
          ref={formRef}
          className="relative flex flex-col gap-2 w-full lg:w-auto"
          aria-label="Newsletter subscription form"
          onSubmit={handleSubmit}
          noValidate
        >
          <HoneypotField {...honeypotProps} />
          <div className="flex w-full lg:w-auto gap-2 lg:gap-3">
            <input
              type="email"
              name="email"
              autoComplete="email"
              maxLength={254}
              value={email}
              onChange={onEmailChange}
              placeholder={FOOTER_NEWSLETTER.placeholder}
              aria-label="Work email address"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "footer-newsletter-email-error" : undefined}
              required
              className={`border rounded-btn px-3 lg:px-4 py-2.5 text-body-sm max-lg:text-card-detail-mobile flex-1 lg:flex-none lg:w-60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm min-w-0 ${errors.email ? "border-error" : "border-border-subtle"}`}
            />
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="max-lg:text-link-card-mobile">
              {isSubmitting ? "Subscribing..." : form.buttonText}
            </Button>
          </div>
          {errors.email && (
            <p id="footer-newsletter-email-error" className="text-[12px] text-error">{errors.email}</p>
          )}
          <label className="flex items-start gap-2 text-[12px] text-ink-muted leading-snug cursor-pointer max-w-md">
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={onConsentChange}
              aria-invalid={Boolean(errors.consent)}
              required
              className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
            />
            <span>
              {form.consentText} See our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </span>
          </label>
          {errors.consent && <p className="text-[12px] text-error">{errors.consent}</p>}
          {submitError && <p role="alert" className="text-[12px] text-error">{submitError}</p>}
        </form>
      )}
    </div>
  );
}
