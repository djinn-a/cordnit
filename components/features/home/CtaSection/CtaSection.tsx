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
  portraitSrc?: string;
};
//Ready to Align Technology with Business Growth?
//Talk to a Enterprise Technology Specialist

export default function CtaSection({
  titleMobile = "Ready to Align Technology with Business Growth?",
  bodyMobile = "Speak directly with our solution architects to evaluate your ecosystem and accelerate execution.",
  titleDesktop = "Ready to Align Technology with Business Growth?",
  bodyDesktop = "Speak directly with our solution architects to evaluate your ecosystem and accelerate execution",
  expertLabel = "Talk to Enterprise Technology Specialist",

  ctaLabel = "Schedule a Call",
  backgroundSrc = "/cta-bg.png",
  portraitSrc = "/expert-portrait.jpg",
}: CtaSectionProps = {}) {
  const { openModal } = useContactModal();

  return (
    <section className="relative w-[calc(100%-2rem)] md:w-full mx-auto md:max-w-[1120px] md:h-[232px] pt-16 pb-20 md:py-8 px-6 md:px-[60px] bg-surface-dark mb-8 sm:mb-12 md:mb-24 overflow-hidden rounded-card-lg md:rounded-3xl shadow-lg">
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backgroundSrc}
          alt=""
          className="w-full h-full object-cover object-[60%_40%] md:object-center scale-[2.5] md:scale-100 -translate-y-[15%] md:translate-y-0 origin-[60%_40%] md:origin-center"
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="relative z-10 w-full md:w-[615px] text-white mb-12 md:mb-0">
          <div className="md:hidden flex flex-col w-full">
            <h2 className="text-h2 text-white font-medium mb-5 tracking-tight whitespace-pre-line">
              {titleMobile.replace(" starting point", "\nstarting point")}
            </h2>
            <p className="text-white/90 text-body-lg font-light max-w-[340px]">
              {bodyMobile}
            </p>
          </div>

          <div className="hidden md:flex flex-col justify-center w-full">
            <h2 className="text-h3 text-white font-medium mb-2 md:mb-3">
              {titleDesktop}
            </h2>
            <p className="text-white text-[16px] font-normal leading-[24px]">
              {bodyDesktop}
            </p>
          </div>
        </div>

        <div className="relative z-10 w-full sm:w-auto">
          <div className="md:hidden bg-white/10 backdrop-blur-2xl border border-white/20 rounded-card-lg p-6 flex flex-col shadow-2xl w-full">
            <div className="flex items-center mb-6">
              <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden mr-4 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitSrc}
                
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center">
                <p className="text-body font-normal leading-snug mb-0.5 text-white/90">
                  {expertLabel}
                </p>
                <p className="text-h4 font-medium leading-snug text-white">
               
                </p>
              </div>
            </div>
            <Button
              onClick={openModal}
              className="w-full py-[18px] bg-surface text-ink hover:bg-primary-pale rounded-full text-body-lg"
            >
              {ctaLabel}
            </Button>
          </div>

          <div className="hidden md:flex flex-col justify-between gap-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-4 w-[260px] h-[156px] shadow-lg shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={portraitSrc}
               
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white flex flex-col justify-center gap-1">
                <p className="text-caption font-normal leading-none text-white/90">
                  {expertLabel}
                </p>
                {/* <p className="text-body-sm font-medium leading-tight text-white">
              
                </p> */}
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
