"use client";

import Button from "@/components/ui/Button/Button";

export default function NewsletterForm() {
  return (
    <div className="w-full md:w-1/2 max-w-lg flex flex-col gap-3">
      <form className="flex gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Work email"
          required
          className="flex-1 h-space-45 px-3 md:px-4 bg-white border border-border-subtle rounded-lg text-card-desc-mobile md:text-body-14 text-ink focus:outline-none"
        />
        <Button
          type="submit"
          variant="primary"
          className="h-space-45 px-4 md:px-6 text-card-desc-mobile md:text-link-mobile font-semibold rounded-lg shadow-sm transition-colors"
        >
          Subscribe
        </Button>
      </form>
      <div className="flex items-start gap-2 md:gap-3 mt-1 md:mt-2">
        <input
          type="checkbox"
          id="newsletter-consent"
          required
          className="mt-0.5 md:mt-1 w-3 h-3 md:w-4 md:h-4 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
        />
        <label htmlFor="newsletter-consent" className="text-card-detail-mobile md:text-body-14 text-ink-muted leading-relaxed">
          I would like to receive Cordinit insights. I understand I can unsubscribe at any time. Read our Privacy Policy.
        </label>
      </div>
    </div>
  );
}
