"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import type { FooterCmsContent } from "./footerData";
import { useAnalyticsVisibility } from "@/lib/analytics/useAnalyticsVisibility";

export default function FooterNewsletter({ content }: Readonly<{ content: FooterCmsContent["newsletter"] }>) {
  const formRef = useAnalyticsVisibility('newsletter_view', { location: 'newsletter-footer' });
  const { email, consent, status, errors, submitError, honeypotProps, onEmailChange, onConsentChange, handleSubmit } =
    useNewsletterSubscribe("Footer Newsletter");
  const isSubmitting = status === "submitting";

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-10 w-full lg:w-auto mx-auto lg:ml-auto lg:mr-0 max-w-3xl">
      <div className="flex flex-col max-w-70">
        <h4 className="text-ink text-h4 mb-1 max-lg:text-link-mobile">{content.heading}</h4>
        <p className="text-ink-muted text-card-desc max-lg:text-section-subtitle-mobile">
          {content.description}
        </p>
      </div>
      {status === "success" ? (
        <p role="status" className="flex items-center gap-2 text-body-sm text-ink">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" aria-hidden="true" />
          {content.successText}
        </p>
      ) : (
        <form
          ref={formRef}
          className="relative flex flex-col gap-2 w-full lg:w-auto"
          aria-label={content.formLabel}
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
              placeholder={content.placeholder}
              aria-label={content.emailLabel}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "footer-newsletter-email-error" : undefined}
              required
              className={`border rounded-btn px-3 lg:px-4 py-2.5 text-body-sm max-lg:text-card-detail-mobile flex-1 lg:flex-none lg:w-60 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm min-w-0 ${errors.email ? "border-error" : "border-border-subtle"}`}
            />
            <Button type="submit" variant="primary" size="md" disabled={isSubmitting} className="max-lg:text-link-card-mobile">
              {isSubmitting ? content.submittingText : content.buttonText}
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
              {content.consentText}{" "}
              {content.privacyLinkHref ? <Link href={content.privacyLinkHref} className="text-primary hover:underline">{content.privacyLinkLabel}</Link> : <span>{content.privacyLinkLabel}</span>}.
            </span>
          </label>
          {errors.consent && <p className="text-[12px] text-error">{errors.consent}</p>}
          {submitError && <p role="alert" className="text-[12px] text-error">{submitError}</p>}
        </form>
      )}
    </div>
  );
}
