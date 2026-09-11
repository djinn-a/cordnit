"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";

import { TestimonialsSectionProps } from './types';
import TestimonialCard from './TestimonialCard';

import { defaultItems } from './data';
import RecognitionCard from "../RecognitionSection/RecognitionCard";

export default function TestimonialsSection({
  eyebrow = "TESTIMONIALS",
  title = "Proven Results. Trusted by Security and Technology Leaders.",
  description = "Hear from enterprise executives on how Cordinit strengthens digital resilience and accelerates transformation.",
  items = defaultItems,
  }: TestimonialsSectionProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);


  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Section spacing="md" className="py-8 sm:py-20 lg:py-24 overflow-hidden">
      <Container width="wide">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          subtitle={description}
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
        />

        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory hide-scrollbar mb-4 sm:mb-8"
        >
          {items.map((item) => (
           <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-ink" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
            <div className="w-1.5 h-1.5 rounded-full bg-border-subtle" />
          </div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-subtle text-ink-muted hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll testimonials left"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border-subtle text-ink-muted hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll testimonials right"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
