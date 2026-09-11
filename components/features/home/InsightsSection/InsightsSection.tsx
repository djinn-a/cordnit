"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";

export type InsightItem = {
  id: string | number;
  tag: string;
  date: string;
  type: string;
  title: string;
  image: string;
};

export type InsightsSectionProps = {
  eyebrow?: string;
  title?: string;
  insights?: InsightItem[];
};

const defaultInsights: InsightItem[] = [
  {
    id: 1,
    tag: "CYBERSECURITY",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    tag: "SALESFORCE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    tag: "AI & AUTOMATION",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    tag: "CLOUD & INFRASTRUCTURE",
    date: "Aug 26, 2026",
    type: "Article",
    title: "Why Security Must Be the Foundation of Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  },
];

export default function InsightsSection({
  eyebrow = "INSIGHTS & PERSPECTIVE",
  title = "Ideas engineered for business progress",
  insights = defaultInsights,
}: InsightsSectionProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <Section spacing="sm" className="pt-8 pb-8 sm:py-16 lg:py-20 overflow-hidden">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={
            title.includes("business progress") ? (
              <>
                Ideas engineered for <br />
                business progress
              </>
            ) : (
              title
            )
          }
          className="mb-8 sm:mb-12"
        />

        <div
          ref={scrollRef}
          className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory hide-scrollbar grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 pb-4 sm:pb-0"
        >
          {insights.map((item) => (
            <div
              key={item.id}
              className="group relative h-panel flex-none w-[88%] sm:w-auto snap-start overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div className="absolute inset-0 w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="relative z-10 p-4">
                <span className="inline-block bg-ink text-white text-caption font-semibold tracking-wider px-3 py-1.5 uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="relative z-10 p-6 bg-black/40 backdrop-blur-md border-t border-white/10">
                <div className="flex items-center text-ink-subtle text-caption mb-2">
                  <span>{item.type}</span>
                  <span className="mx-2">•</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-white font-medium text-h4 mb-4 line-clamp-3">
                  {item.title}
                </h3>
                <div className="flex items-center text-primary text-body-sm font-medium">
                  Read more <ArrowRight className="ml-1.5 h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-ink" />
            <div className="w-2 h-2 rounded-full bg-border-subtle" />
            <div className="w-2 h-2 rounded-full bg-border-subtle" />
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-ink-subtle hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll insights left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-border-subtle text-ink-subtle hover:text-ink hover:border-ink transition-colors"
              aria-label="Scroll insights right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
