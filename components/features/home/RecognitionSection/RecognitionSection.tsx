"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";

export type RecognitionItem = {
  id: string | number;
  category: string;
  title: string;
  desc: string;
  image: string;
};

export type RecognitionSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: RecognitionItem[];
};

const defaultItems: RecognitionItem[] = [
  {
    id: 1,
    category: "01 — AWARD",
    title: "Stevie® Gold Winner",
    desc: "Recognized for outstanding achievement in enterprise technology innovation and...",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    category: "02 — AWARD",
    title: "AI Excellence Award",
    desc: "Awarded for our groundbreaking work in machine learning integration for core...",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    category: "03 — CERTIFICATION",
    title: "#1 for Deep Research",
    desc: "Ranked top provider for deep learning research capabilities by independent...",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function RecognitionSection({
  eyebrow = "ENGINE CLOCK / ACTIVE",
  title = "Industry Recognition",
  description = "Independent recognition of our AI platforms, services, and the business outcomes they deliver.",
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
          align="center"
          className="items-start sm:items-center text-left sm:text-center mb-8 sm:mb-12 lg:mb-16"
        />

        <div
          ref={scrollRef}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-4 sm:pb-0 mb-6 sm:mb-0"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-none w-full sm:w-auto snap-start flex flex-col bg-surface border border-primary-pale rounded-card p-3 sm:p-4 shadow-sm hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-full h-48 rounded-lg overflow-hidden mb-5 bg-primary-pale">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-grow px-1 sm:px-2 pb-2">
                <span className="text-eyebrow mb-2">{item.category}</span>
                <h3 className="text-h3 font-normal sm:font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-body-sm mb-6 flex-grow">{item.desc}</p>
                <a
                  href="#"
                  className="flex items-center text-primary text-body-sm font-medium hover:text-primary-hover transition-colors"
                >
                  View recognition <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
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
