"use client";

import { useId } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { HoneypotField } from "@/components/ui/HoneypotField";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import type { NewsletterSectionProps } from "./NewsletterSection.types";

export default function NewsletterForm({
  placeholder = "Work email",
  buttonText = "Subscribe",
  consentText = "I would like to receive Cordinit insights. I understand I can unsubscribe at any time. Read our Privacy Policy.",
}: Readonly<Pick<NewsletterSectionProps, "placeholder" | "buttonText" | "consentText">>) {
  const id = useId();
  const { email, consent, status, errors, submitError, honeypotProps, onEmailChange, onConsentChange, handleSubmit } =
    useNewsletterSubscribe("Newsletter Section");

  if (status === "success") {
    return (
      <div role="status" className="w-full md:w-1/2 max-w-[512px] flex items-center gap-3 text-[14px] md:text-[16px] text-ink">
        <CheckCircle2 className="w-5 h-5 text-success shrink-0" aria-hidden="true" />
        Thanks for subscribing. You&apos;ll hear from us soon.
      </div>
    );
  }

  const emailErrorId = `${id}-email-error`;
  const isSubmitting = status === "submitting";

  return (
    <form className="relative w-full md:w-1/2 max-w-[512px] flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <HoneypotField {...honeypotProps} />
      <div className="flex gap-2 w-full">
        <input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Work email address"
          maxLength={254}
          value={email}
          onChange={onEmailChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? emailErrorId : undefined}
          placeholder={placeholder}
          required
          className={`flex-1 h-[40px] px-3 md:px-4 bg-white border rounded-lg text-[14px] text-ink focus:outline-none focus:border-primary ${errors.email ? "border-error" : "border-border-subtle"}`}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="h-[40px] px-6 text-[14px] font-semibold rounded-lg shadow-sm transition-colors shrink-0"
        >
          {isSubmitting ? "Subscribing..." : buttonText}
        </Button>
      </div>
      {errors.email && <p id={emailErrorId} className="text-[12px] text-error">{errors.email}</p>}
      <div className="flex items-start gap-2 md:gap-3 mt-1 md:mt-2">
        <input
          type="checkbox"
          id={`${id}-consent`}
          name="consent"
          checked={consent}
          onChange={onConsentChange}
          aria-invalid={Boolean(errors.consent)}
          required
          className="mt-0.5 md:mt-1 w-3 h-3 md:w-4 md:h-4 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
        />
        <label htmlFor={`${id}-consent`} className="text-[10px] md:text-[14px] text-ink-muted leading-relaxed">
          {consentText}
        </label>
      </div>
      {errors.consent && <p className="text-[12px] text-error">{errors.consent}</p>}
      {submitError && <p role="alert" className="text-[12px] text-error">{submitError}</p>}
    </form>
  );
}
