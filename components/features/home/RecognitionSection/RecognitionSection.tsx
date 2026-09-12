"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";

import { RecognitionSectionProps } from './types';
import RecognitionCard from './RecognitionCard';

import { defaultItems } from './data';

export default function RecognitionSection({
  eyebrow = "COMPLIANCE & PARTNERSHIPS",
  title = (
  <>
    Verified Security Standards &<br />
    Strategic Ecosystems
  </>
),
  description = "We align our engineering and operational delivery with internationally recognized compliance frameworks and enterprise partner networks.",
  items = defaultItems,
}: RecognitionSectionProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Section spacing="md" className="py-8 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          subtitleClassName="lg:text-[20px]"
          align="center"
          titleClassName="font-800"
          className="items-start sm:items-center text-left sm:text-center mb-8 sm:mb-12 lg:mb-16"
        />

        <div
          ref={scrollRef}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-0 mb-6 sm:mb-0"
        >
          {items.map((item) => (
           <RecognitionCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex sm:hidden items-center justify-between mt-2">
          <div className="flex items-center space-x-1.5 ml-1">
            <div className="w-1.5 h-1.5 rounded-full bg-ink" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle text-ink-muted hover:text-ink transition-colors"
              aria-label="Scroll recognition left"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border-subtle text-ink-muted hover:text-ink transition-colors"
              aria-label="Scroll recognition right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
