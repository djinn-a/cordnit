"use client";

import { Image } from '@/components/ui/Image';
import { CtaButton, Container, Section } from "@/components/ui";
import { defaultSolutionsHeroContent, type SolutionsHeroContent } from "./solutionsHeroData";
import { ArrowRight } from "lucide-react";

export type SolutionsHeroProps = Partial<SolutionsHeroContent>;

export default function SolutionsHero(props: SolutionsHeroProps = {}) {
  const content = { ...defaultSolutionsHeroContent, ...props };

  return (
    <Section spacing="none" background="white">
      <Container className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 px-0!">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h4 className="text-hero-eyebrow mb-4 lg:mb-6">
            {content.eyebrow}
          </h4>
          <h1 className="mb-4 lg:mb-6 max-w-lg font-extrabold">
            <span className="block lg:hidden text-section-title-mobile sm:text-card-title">{content.titleMobile}</span>
            <span className="hidden lg:block text-hero-display">{content.titleDesktop}</span>
          </h1>
          <p className="text-ink-muted text-section-subtitle-mobile sm:text-section-subtitle mb-8 lg:mb-10 max-w-lg">
            {content.body}
          </p>
          {content.cta && (
            <CtaButton
              cta={content.cta}
              className="px-6 py-3"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              ctaLocation="solutions-hero"
            />
          )}
        </div>

        {/* Image Content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full h-80 sm:h-100 lg:h-105 rounded-hero overflow-hidden shadow-2xl">
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
