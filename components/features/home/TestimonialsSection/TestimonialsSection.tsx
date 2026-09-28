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
  
  const overriddenItems = items.map((item, index) => {
    let newImage = "";
    if (item.name.includes("Michelle")) {
      newImage = "/AboutHero/michelle_pieszko_2x.webp";
    } else if (item.name.includes("Nitin")) {
      newImage = "/testimonial/nitin_raina_2x.webp";
    } else if (item.name.includes("Rohit")) {
      newImage = "/testimonial/rohit_kohli_3x.webp";
    } else {
      const fallbackImages = [
        "/testimonial/nitin_raina_2x.webp",
        "/testimonial/rohit_kohli_3x.webp",
        "/AboutHero/michelle_pieszko_2x.webp"
      ];
      newImage = fallbackImages[index % 3];
    }
    
    return {
      ...item,
      image: newImage
    };
  });

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
  } = useScrollSnapCarousel({ itemCount: overriddenItems.length });

  return (
    <Section spacing="none" className="overflow-hidden">
      <Container width="wide" className="">
        <SectionHeader
          eyebrow={eyebrow}
          eyebrowClassName="text-primary text-eyebrow-mobile font-extrabold sm:text-eyebrow-desktop sm:font-semibold"
          title={title}
          titleClassName="text-section-title-mobile sm:text-section-title !font-extrabold"
          subtitle={description}
          subtitleClassName="text-section-subtitle-mobile sm:text-section-subtitle"
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-6 sm:mb-8 max-w-4xl mx-auto"
        />

        <div
          ref={scrollerRef}
          onScroll={onScrollerScroll}
          className="flex gap-4 lg:gap-6 overflow-x-auto pb-4 sm:pb-6 snap-x snap-mandatory hide-scrollbar mb-4 sm:mb-6"
        >
          {overriddenItems.map((item) => (
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
