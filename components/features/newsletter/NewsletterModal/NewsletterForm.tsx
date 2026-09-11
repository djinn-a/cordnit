"use client";

import React from 'react';
import { useNewsletterModal } from './NewsletterModalProvider';
import { defaultNewsletterContent } from './newsletterContent';

export default function NewsletterForm() {
  const { submit } = useNewsletterModal();
  const { form } = defaultNewsletterContent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

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

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-[13px] text-ink-subtle">
            {form.emailLabel}
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder={form.emailPlaceholder}
            className="w-full px-4 py-3.5 bg-surface-darker/50 border border-white/5 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="consent"
              type="checkbox"
              required
              className="w-4 h-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:ring-offset-surface-dark"
            />
          </div>
          <label htmlFor="consent" className="text-[13px] text-ink-subtle leading-snug cursor-pointer">
            {form.consentText}
          </label>
        </div>

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
