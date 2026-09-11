"use client";

import { ArrowRight } from "lucide-react";
import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";
import { Button } from "@/components/ui";
import type { HeroContent } from "./heroContent";

type HeroOverlayCardProps = Pick<
  HeroContent,
  "cardEyebrow" | "cardTitle" | "cardBody" | "primaryCta" | "secondaryCta"
>;

export default function HeroOverlayCard({
  cardEyebrow,
  cardTitle,
  cardBody,
  primaryCta,
  secondaryCta,
}: Readonly<HeroOverlayCardProps>) {
  const { openModal } = useContactModal();

  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 max-w-[420px] sm:max-w-[540px] w-[94%] md:w-[90%] lg:w-full bg-white/30 backdrop-blur-xl border border-white/40 p-5 xs:p-6 sm:p-8 rounded-2xl shadow-card">
      <p className="text-white/90 text-caption tracking-widest uppercase mb-2 sm:mb-3">
        {cardEyebrow}
      </p>
      
      <h2 className="font-mulish text-[32px] font-bold leading-[40px] text-white mb-3 sm:mb-4">
        {cardTitle.split('. ').map((part, index, array) => (
          <span key={index} className="block">
            {part}{index < array.length - 1 ? '.' : ''}
          </span>
        ))}
      </h2>
      
      <p className="text-white/90 text-body max-sm:text-mobile-body-1 max-sm:text-[#FFF] font-medium sm:font-light mb-5 sm:mb-6">
        {cardBody}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <Button
          onClick={openModal}
          className="flex-1"
          rightIcon={<ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
        >
          {primaryCta}
        </Button>
        <Button
          variant="secondary"
          className="flex-1"
          rightIcon={
            <ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-primary" />
          }
        >
          {secondaryCta}
        </Button>
      </div>
    </div>
  );
}
