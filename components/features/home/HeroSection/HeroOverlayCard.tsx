"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  return (
    <div className="absolute bottom-space-8 sm:bottom-space-32 lg:bottom-space-34 left-1/2 -translate-x-1/2 lg:left-space-30 lg:translate-x-0 max-w-105 sm:max-w-135 w-[94%] md:w-[90%] lg:w-full bg-white/30 backdrop-blur-xl border border-white/40 px-space-20 py-space-24 sm:px-space-32 rounded-lg shadow-card">
      <p className="text-white/90 text-caption max-sm:text-card-detail-mobile tracking-widest uppercase mb-space-24">
        {cardEyebrow}
      </p>

      <h2 className="text-card-title-mobile font-bold sm:text-card-title text-white mb-space-12 sm:mb-space-16">{cardTitle}</h2>

      <p className="text-section-subtitle-mobile sm:text-card-desc text-white/90 font-normal sm:font-light mb-space-40">
        {cardBody}
      </p>

      <div className="flex flex-col sm:flex-row gap-space-12 sm:gap-space-16 w-full">
        <Button
          onClick={() => openModal()}
          className="flex-1 sm:flex-none"
          rightIcon={<ArrowRight className="h-space-16 w-space-16 sm:h-space-14 sm:w-space-14" />}
        >
          {primaryCta}
        </Button>
        <Button
          variant="secondary"
          className="flex-1 sm:flex-none"
          onClick={() => router.push("/solutions")}
          rightIcon={
            <ArrowRight className="h-space-16 w-space-16 sm:h-space-14 sm:w-space-14 text-primary" />
          }
        >
          {secondaryCta}
        </Button>
      </div>
    </div>
  );
}
