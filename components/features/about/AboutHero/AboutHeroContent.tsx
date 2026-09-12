"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";

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

  return (
    <div className="absolute bottom-4 sm:bottom-12 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 w-[94%] max-w-[420px] sm:max-w-none sm:w-auto md:w-[480px] lg:w-[560px] bg-surface/30 sm:bg-surface/20 backdrop-blur-md p-6 sm:p-12 rounded-card border border-surface/20 shadow-2xl">
      <p className="hidden sm:block text-surface/90 text-caption tracking-wide mb-6">
        About Cordinit
      </p>
      <h2 className="hidden sm:block text-h2 text-surface font-normal mb-3 sm:mb-4">
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
      <p className="sm:hidden text-surface/90 text-body font-light mb-8">
        {bodyMobile}
      </p>
      <p className="hidden sm:block text-surface/90 text-body font-light mb-10 pr-2">
        {bodyDesktop}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
        <Button
          onClick={openModal}
          className="w-full sm:w-auto sm:flex-none cursor-pointer"
          rightIcon={<ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
        >
          <span className="sm:hidden">Book a call</span>
          <span className="hidden sm:inline">Talk to Us</span>
        </Button>
        <Button
          variant="secondary"
          className="w-full sm:w-auto sm:flex-none cursor-pointer"
          rightIcon={
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          }
        >
          <span className="sm:hidden">Explore solutions</span>
          <span className="hidden sm:inline">Explore how we work</span>
        </Button>
      </div>
    </div>
  );
}

