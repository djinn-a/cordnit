"use client";

import { Container, Section, SectionHeader, CarouselControls } from "@/components/ui";
import { useScrollSnapCarousel } from "@/hooks/useScrollSnapCarousel";

import { RecognitionSectionProps } from './types';
import RecognitionCard from './RecognitionCard';

import { defaultItems } from './data';

export default function RecognitionSection({
  eyebrow = "COMPLIANCE & PARTNERSHIPS",
  title = (
  <>
    Verified Security Standards & <br />
    Strategic Ecosystems
  </>
),
  description = "We align our engineering and operational delivery with internationally recognized compliance frameworks and enterprise partner networks.",
  items = defaultItems,
}: RecognitionSectionProps = {}) {
  const {
    scrollerRef,
    activeIndex,
    pageCount,
    scrollToIndex,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    onScrollerScroll,
  } = useScrollSnapCarousel({ itemCount: items.length });

  return (
    <Section spacing="md" className="py-8 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          eyebrowClassName="text-primary text-eyebrow-mobile sm:text-eyebrow-desktop"
          title={title}
          titleClassName="text-section-title-mobile sm:text-section-title !font-extrabold"
          subtitle={description}
          subtitleClassName="text-section-subtitle-mobile sm:text-section-subtitle"
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-8 sm:mb-12 lg:mb-16"
        />

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-0 mb-6 sm:mb-0"
        >
          {items.map((item) => (
           <RecognitionCard key={item.id} item={item} />
          ))}
        </div>

        <CarouselControls
          count={pageCount}
          activeIndex={activeIndex}
          onPrev={scrollPrev}
          onNext={scrollNext}
          onDotClick={scrollToIndex}
          canScrollPrev={canScrollPrev}
          canScrollNext={canScrollNext}
          size="sm"
          prevLabel="Scroll recognition left"
          nextLabel="Scroll recognition right"
          className="sm:hidden mt-2"
        />
      </Container>
    </Section>
  );
}
