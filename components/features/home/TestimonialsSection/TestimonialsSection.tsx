"use client";

import { Container, Section, SectionHeader, CarouselControls } from "@/components/ui";
import { useScrollSnapCarousel } from "@/hooks/useScrollSnapCarousel";
import { TestimonialsSectionProps } from './types';
import TestimonialCard from './TestimonialCard';
import { defaultItems } from './data';

export default function TestimonialsSection({
  eyebrow = "TESTIMONIALS",
  title = "Proven Results. Trusted by Security and Technology Leaders.",
  description = "Hear from enterprise executives on how Cordinit strengthens digital resilience and accelerates transformation.",
  items = defaultItems,
  }: TestimonialsSectionProps = {}) {
  const {
    scrollerRef,
    activeIndex,
    pageCount,
    scrollToIndex,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    hasOverflow,
    onScrollerScroll,
  } = useScrollSnapCarousel({ itemCount: items.length });

  return (
    <Section spacing="none" className="py-6 sm:py-10 lg:py-12 overflow-hidden">
      <Container width="wide" className="lg:px-15">
        <SectionHeader
          eyebrow={eyebrow}
          eyebrowClassName="text-primary text-eyebrow-mobile font-extrabold sm:text-eyebrow-desktop sm:font-semibold"
          title={title}
          titleClassName="text-section-title-mobile sm:text-section-title !font-extrabold"
          subtitle={description}
          subtitleClassName="text-section-subtitle-mobile sm:text-section-subtitle"
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-6 sm:mb-8 max-w-3xl mx-auto"
        />

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory hide-scrollbar mb-4 sm:mb-6"
        >
          {items.map((item) => (
           <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {hasOverflow ? (
          <CarouselControls
            count={pageCount}
            activeIndex={activeIndex}
            onPrev={scrollPrev}
            onNext={scrollNext}
            onDotClick={scrollToIndex}
            canScrollPrev={canScrollPrev}
            canScrollNext={canScrollNext}
            prevLabel="Scroll testimonials left"
            nextLabel="Scroll testimonials right"
            className="px-2"
          />
        ) : null}
      </Container>
    </Section>
  );
}
