"use client";

import Image from "next/image";
import { Button, Container, Section } from "@/components/ui";
import { useContactModal } from "../../contact/ContactModal/ContactModalProvider";
import { defaultSolutionsHeroContent, type SolutionsHeroContent } from "./solutionsHeroData";
import { ArrowRight } from "lucide-react";

export type SolutionsHeroProps = Partial<SolutionsHeroContent>;

export default function SolutionsHero(props: SolutionsHeroProps = {}) {
  const content = { ...defaultSolutionsHeroContent, ...props };
  const { openModal } = useContactModal();

  return (
    <Section spacing="none" className="pt-space-80 pb-0 px-4 sm:px-6 lg:px-space-60" background="white">
      <Container className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 !px-0">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h4 className="text-hero-eyebrow mb-4 lg:mb-6">
            {content.eyebrow}
          </h4>
          <h1 className="text-hero-display mb-4 lg:mb-6 max-w-lg font-extrabold">
            {content.titleDesktop}
          </h1>
          <p className="text-ink-muted text-section-subtitle-mobile sm:text-section-subtitle mb-8 lg:mb-10 max-w-lg">
            {content.body}
          </p>
          <Button
            onClick={openModal}
            className="bg-primary hover:bg-primary-hover text-white rounded-md px-6 py-3 flex items-center gap-2 transition-colors"
          >
            {content.ctaLabel} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[552px] rounded-hero overflow-hidden shadow-2xl">
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
