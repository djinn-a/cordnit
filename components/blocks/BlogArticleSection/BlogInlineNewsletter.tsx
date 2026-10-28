"use client";

import { useId } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import { useAnalyticsVisibility } from "@/lib/analytics/useAnalyticsVisibility";
import { cn } from "@/lib/utils/cn";
import type { BlogNewsletterCalloutData } from "./BlogArticleSection.types";

export interface BlogInlineNewsletterProps {
  callout: BlogNewsletterCalloutData;
}

export default function BlogInlineNewsletter({
  callout,
}: Readonly<BlogInlineNewsletterProps>) {
  const id = useId();
  const formRef = useAnalyticsVisibility("newsletter_view", {
    location: "newsletter-section",
  });
  const {
    email,
    consent,
    status,
    errors,
    submitError,
    honeypotProps,
    onEmailChange,
    onConsentChange,
    handleSubmit,
  } = useNewsletterSubscribe("Blog Inline Newsletter");

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!consent) {
      onConsentChange({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    }
    onEmailChange(e);
  };

  const emailErrorId = `${id}-email-error`;
  const isSubmitting = status === "submitting";

  return (
    <div className="w-full p-space-16 md:p-space-32 relative bg-gradient-contact-soft rounded-card border border-border-card flex flex-col md:flex-row justify-start items-start gap-space-16 md:gap-space-56">
      {/* Left Copy */}
      <div className="w-full md:flex-1 flex flex-col justify-start items-start gap-space-8 md:gap-space-12">
        <h3 className="text-ink text-card-title-mobile md:text-cta-title-desktop font-extrabold md:font-bold font-mulish leading-space-28! md:leading-space-40!">
          {callout.title}
        </h3>
        <p className="text-ink-muted text-help-card-desc-mobile md:text-card-desc font-normal font-mulish">
          {callout.description}
        </p>
      </div>

      {/* Right Form */}
      <div className="w-full md:flex-1 flex flex-col justify-start items-start gap-space-8 md:gap-space-12">
        {status === "success" ? (
          <div
            role="status"
            className="w-full flex items-center gap-space-12 text-card-desc text-ink font-mulish"
          >
            <CheckCircle2
              className="size-5 text-success shrink-0"
              aria-hidden="true"
            />
            <span>{callout.consentText}</span>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="w-full flex flex-col justify-start items-start gap-space-8 md:gap-space-12"
          >
            <HoneypotField {...honeypotProps} />
            <div className="w-full flex justify-start items-center gap-space-8">
              <input
                type="email"
                name="email"
                autoComplete="email"
                aria-label={callout.placeholder}
                maxLength={254}
                value={email}
                onChange={handleEmailInput}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? emailErrorId : undefined}
                placeholder={callout.placeholder}
                required
                className={cn(
                  "flex-1 min-w-0 px-space-12 py-space-8 md:px-space-16 md:py-space-10 bg-surface rounded-hero border text-help-card-desc-mobile text-ink placeholder:text-ink-muted font-normal font-mulish focus:outline-none focus:border-primary",
                  errors.email ? "border-error" : "border-border-card",
                )}
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="px-space-24 py-space-8 md:py-space-10 bg-primary hover:bg-primary-hover rounded-hero shadow-help-card text-help-card-desc-mobile md:text-link-mobile font-semibold font-mulish text-white shrink-0"
              >
                {callout.buttonText}
              </Button>
            </div>

            {errors.email && (
              <p id={emailErrorId} className="text-card-desc-mobile text-error">
                {errors.email}
              </p>
            )}

            <p className="w-full text-ink-muted text-stat-desc-mobile md:text-card-desc-mobile font-normal font-mulish text-center md:text-left">
              {callout.consentText}
            </p>

            {submitError && (
              <p role="alert" className="text-card-desc-mobile text-error">
                {submitError}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
