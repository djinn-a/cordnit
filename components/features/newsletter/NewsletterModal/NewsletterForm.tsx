"use client";

import React from 'react';
import { HoneypotField } from '@/components/ui/HoneypotField';
import { useNewsletterModal } from './NewsletterModalProvider';
import { defaultNewsletterContent } from './newsletterContent';

export default function NewsletterForm() {
  const { subscription } = useNewsletterModal();
  const { email, consent, errors, submitError, honeypotProps, onEmailChange, onConsentChange, handleSubmit } = subscription;
  const { form } = defaultNewsletterContent;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h3 className="text-primary text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
          {form.eyebrow}
        </h3>
        <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-4">
          {form.heading}
        </h2>
        <p className="text-ink-subtle text-[15px] sm:text-base leading-relaxed">
          {form.description}
        </p>
      </div>

      <form className="relative space-y-6" onSubmit={handleSubmit} noValidate>
        <HoneypotField {...honeypotProps} />
        <div className="space-y-2">
          <label htmlFor="newsletter-modal-email" className="block text-[13px] text-ink-subtle">
            {form.emailLabel}
          </label>
          <input
            type="email"
            id="newsletter-modal-email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            onChange={onEmailChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'newsletter-modal-email-error' : undefined}
            placeholder={form.emailPlaceholder}
            className={`w-full px-4 py-3.5 bg-surface-darker/50 border rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors ${errors.email ? 'border-error/80' : 'border-white/5'}`}
          />
          {errors.email && (
            <p id="newsletter-modal-email-error" className="text-[12px] text-error/90">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-start gap-3">
            <div className="flex items-center h-5 mt-0.5">
              <input
                id="newsletter-modal-consent"
                name="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={onConsentChange}
                aria-invalid={Boolean(errors.consent)}
                className="w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:ring-offset-surface-dark"
              />
            </div>
            <label htmlFor="newsletter-modal-consent" className="text-[13px] text-ink-subtle leading-snug cursor-pointer">
              {form.consentText}
            </label>
          </div>
          {errors.consent && <p className="mt-1.5 text-[12px] text-error/90">{errors.consent}</p>}
        </div>

        {submitError && (
          <p role="alert" className="p-3 text-[13px] text-red-400 bg-red-900/20 border border-error/50 rounded-lg">
            {submitError}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-medium text-[15px] rounded-xl transition-colors mt-2"
        >
          {form.buttonText}
        </button>
      </form>
    </div>
  );
}
