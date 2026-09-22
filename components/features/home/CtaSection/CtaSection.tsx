"use client";

import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";
import { Button } from "@/components/ui";

export type CtaSectionProps = {
  titleMobile?: string;
  bodyMobile?: string;
  titleDesktop?: string;
  bodyDesktop?: string;
  expertLabel?: string;
  expertName?: string;
  ctaLabel?: string;
  backgroundSrc?: string;
  backgroundSrcMobile?: string;
  portraitSrc?: string;
};

export default function CtaSection({
  titleMobile = "Ready to Align Technology with Business Growth?",
  bodyMobile = "Speak directly with our solution architects to evaluate your ecosystem and accelerate execution.",
  titleDesktop = "Ready to Align Technology with Business Growth?",
  bodyDesktop = "Speak directly with our solution architects to evaluate your ecosystem and accelerate execution.",
  expertName = "Talk to a Enterprise Technology Specialist",
  ctaLabel = "Schedule a Call",
  backgroundSrc = "/cta-bg.webp",
  backgroundSrcMobile = "/cta-bg-mobile.webp",
  portraitSrc = "/expert-portrait.webp",
}: CtaSectionProps = {}) {
  const { openModal } = useContactModal();

  return (
    <section className="relative w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-120px)] mx-auto max-w-[1320px] md:h-[232px] pt-10 pb-10 md:py-8 px-6 md:px-[60px] bg-surface-dark mb-8 sm:mb-12 md:mb-24 overflow-hidden rounded-2xl shadow-lg">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundSrcMobile}
          alt=""
          className="md:hidden w-full h-full object-cover object-center"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundSrc}
          alt=""
          className="hidden md:block w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="relative z-10 w-full md:w-[615px] text-white mb-12 md:mb-0">
          <div className="md:hidden flex flex-col w-full">
            <h2 className="text-cta-title-mobile text-white mb-5 tracking-tight max-w-65">
              {titleMobile}
            </h2>
            <p className="text-white/90 text-section-subtitle-mobile max-w-[320px]">
              {bodyMobile}
            </p>
          </div>

          <div className="hidden md:flex flex-col justify-center w-full">
            <h2 className="text-cta-title-desktop text-white mb-2 md:mb-3">
              Ready to Align Technology with Business Growth?
            </h2>
            <p className="text-white/80 text-body font-light">{bodyDesktop}</p>
          </div>
        </div>

        <div className="relative z-10 w-full sm:w-auto">
          <div className="md:hidden bg-white/10 backdrop-blur-2xl border border-white/20 rounded-card-lg p-6 flex flex-col shadow-2xl w-full">
            <div className="flex items-center mb-6">
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden mr-4 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitSrc}
                  alt={expertName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center">
                <p className="text-cta-expert-desktop text-white w-min">
                  {expertName}
                </p>
              </div>
            </div>
            <Button
              onClick={openModal}
              className="w-full py-4.5 bg-surface text-ink hover:bg-primary-pale rounded-[8px] text-mobile-cta-1"
            >
              {ctaLabel}
            </Button>
          </div>

          <div className="hidden md:flex flex-col justify-between gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-4 w-[260px] h-[156px] shadow-lg shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitSrc}
                  alt={expertName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center gap-1">
                <p className="text-cta-expert-desktop text-white">
                  {expertName}
                </p>
              </div>
            </div>
            <Button
              onClick={openModal}
              className="w-full py-2.5 bg-surface text-ink hover:bg-primary-pale rounded-full mt-auto"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
