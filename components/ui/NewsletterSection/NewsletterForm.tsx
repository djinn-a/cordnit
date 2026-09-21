"use client";

import Button from "@/components/ui/Button/Button";
import type { NewsletterSectionProps } from "./NewsletterSection.types";

export default function NewsletterForm({
  placeholder = "Work email",
  buttonText = "Subscribe",
  consentText = "I would like to receive Cordinit insights. I understand I can unsubscribe at any time. Read our Privacy Policy.",
}: Readonly<Pick<NewsletterSectionProps, "placeholder" | "buttonText" | "consentText">>) {
  return (
    <div className="w-full md:w-1/2 max-w-[512px] flex flex-col gap-3">
      <form className="flex gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder={placeholder}
          required
          className="flex-1 h-[45px] px-3 md:px-4 bg-white border border-border-subtle rounded-lg text-[12px] md:text-[14px] text-ink focus:outline-none focus:border-primary"
        />
        <Button
          type="submit"
          variant="primary"
          className="h-[45px] px-4 md:px-6 text-[12px] md:text-[14px] font-semibold rounded-lg shadow-sm transition-colors"
        >
          {buttonText}
        </Button>
      </form>
      <div className="flex items-start gap-2 md:gap-3 mt-1 md:mt-2">
        <input
          type="checkbox"
          id="newsletter-consent"
          required
          className="mt-0.5 md:mt-1 w-3 h-3 md:w-4 md:h-4 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
        />
        <label htmlFor="newsletter-consent" className="text-[10px] md:text-[14px] text-ink-muted leading-relaxed">
          {consentText}
        </label>
      </div>
    </div>
  );
}
