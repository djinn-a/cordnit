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
    <div className="absolute bottom-4 sm:bottom-8 lg:bottom-[34px] left-1/2 -translate-x-1/2 lg:left-[30px] lg:translate-x-0 max-w-105 sm:max-w-135 w-[94%] md:w-[90%] lg:w-full bg-white/30 backdrop-blur-xl border border-white/40 px-8 py-6 rounded-lg shadow-card">
      <p className="text-white/90 text-caption tracking-widest uppercase mb-6">
        {cardEyebrow}
      </p>

      <h2 className="text-[20px] font-bold sm:text-card-title text-white mb-3 sm:mb-4">{cardTitle}</h2>

      <p className="text-mobile-body-1 sm:text-card-desc text-white/90 font-light mb-10">
        {cardBody}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <Button
          onClick={openModal}
          className="flex-1 sm:flex-none"
          rightIcon={<ArrowRight className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
        >
          {primaryCta}
        </Button>
        <Button
          variant="secondary"
          className="flex-1 sm:flex-none"
          onClick={() => router.push("/solutions")}
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
