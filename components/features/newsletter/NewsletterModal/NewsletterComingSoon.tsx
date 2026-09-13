"use client";

import React from "react";
import Link from "next/link";
import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";
import { useNewsletterModal } from "./NewsletterModalProvider";
import { defaultNewsletterContent } from "./newsletterContent";

export default function NewsletterComingSoon() {
  const { openModal: openContactModal } = useContactModal();
  const { closeModal } = useNewsletterModal();
  const { comingSoon } = defaultNewsletterContent;

  const handleContact = () => {
    closeModal();
    openContactModal({ ctaLocation: "Newsletter Modal" });
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8">
        <h3 className="text-primary text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
          {comingSoon.eyebrow}
        </h3>
        <h2 className="text-[32px] sm:text-[40px] font-bold text-white leading-[1.2] mb-4">
          {comingSoon.heading}
        </h2>
        <p className="text-ink-subtle text-[15px] sm:text-base leading-relaxed">
          {comingSoon.description}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleContact}
          className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover text-white font-medium text-[15px] rounded-xl transition-colors"
        >
          {comingSoon.primaryCta}
        </button>
        <Link
          href="/"
          onClick={closeModal}
          className="w-full py-3.5 px-4 bg-transparent border border-white/20 hover:bg-white/5 text-white font-medium text-[15px] rounded-xl transition-colors text-center"
        >
          {comingSoon.secondaryCta}
        </Link>
      </div>
    </div>
  );
}
