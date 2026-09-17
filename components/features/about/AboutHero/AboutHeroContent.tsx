"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";

export type AboutHeroContentProps = {
  title: string;
  bodyMobile: string;
  bodyDesktop: string;
};

export default function AboutHeroContent({
  title,
  bodyMobile,
  bodyDesktop,
}: AboutHeroContentProps) {
  const { openModal } = useContactModal();
  const router = useRouter();

  // We explicitly split the title based on the exact visual layout from the data.
  // Alternatively we could just use the title as is if it naturally wraps,
  // but preserving the explicit break logic matching the previous hardcoded markup.
  return (
    <div className="absolute bottom-4 sm:bottom-12 left-4 sm:left-12 w-[calc(100%-2rem)] sm:w-auto md:w-[480px] lg:w-[560px] bg-surface/30 sm:bg-surface/20 backdrop-blur-md p-6 sm:p-12 rounded-card border border-surface/20 shadow-2xl">
      <p className="text-surface/90 text-caption tracking-widest uppercase mb-6">
        About Cordinit
      </p>
      <h2 className="text-[20px] font-bold text-surface mb-3 sm:mb-4">
        {title.split("made more").map((part, index) =>
          index === 0 ? (
            <span key={index}>
              {part}
              <br />
            </span>
          ) : (
            <span key={index}>made more{part}</span>
          )
        )}
      </h2>
      <p className="text-surface/90 text-mobile-body-1 sm:text-card-desc font-light mb-10 pr-2">
        {bodyDesktop}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <Button
          className="flex-1 sm:flex-none text-mobile-cta-1 sm:text-button"
          rightIcon={<ArrowRight className="text-white h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          onClick={() => openModal({ ctaLocation: "about-hero" })}
        >
          <span className="text-white">Talk to Us</span>
        </Button>
      </div>
    </div>
  );
}
