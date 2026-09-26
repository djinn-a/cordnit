"use client";

import { Container, Section, SectionHeader, CarouselControls } from "@/components/ui";
import { useScrollSnapCarousel } from "@/hooks/useScrollSnapCarousel";
import { insightsData, InsightItem } from "./insightsData";
import InsightCard from "./InsightCard";
import MultilineText from "@/components/ui/MultilineText/MultilineText";

export type InsightsSectionProps = {
  eyebrow?: string;
  title?: string;
  insights?: InsightItem[];
};

export default function InsightsSection({
  eyebrow = "INSIGHTS & PERSPECTIVE",
  title = "Ideas Built to Accelerate\nSustainable Growth",
  insights = insightsData,
}: InsightsSectionProps = {}) {
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
  } = useScrollSnapCarousel({ itemCount: insights.length });

  return (
    <Section spacing="none" className="overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          eyebrowClassName="text-primary text-eyebrow-mobile font-extrabold sm:text-eyebrow-desktop sm:font-semibold"
          title={<MultilineText text={title} />}
          titleClassName="text-section-title-mobile sm:text-section-title !font-extrabold"
          className="mb-8 sm:mb-12"
        />

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-0"
        >
          {insights.map((item) => (
            <InsightCard
              key={item.id}
              item={item}
              className="flex-none w-[88%] sm:w-auto snap-start"
            />
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
          prevLabel="Scroll insights left"
          nextLabel="Scroll insights right"
          className="sm:hidden"
        />
      </Container>
    </Section>
  );
}
