"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { insightsData, InsightItem } from "./insightsData";
import InsightCard from "./InsightCard";

export type InsightsSectionProps = {
  eyebrow?: string;
  title?: string;
  insights?: InsightItem[];
};

export default function InsightsSection({
  eyebrow = "INSIGHTS & PERSPECTIVE",
  title = "Ideas Built to Accelerate Sustainable Growth",
  insights = insightsData,
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
            title.includes("Sustainable Growth") ? (
              <>
                Ideas Built to Accelerate <br />
                Sustainable Growth
              </>
            ) : (
              title
            )
          }
          titleClassName="font-800"
          className="mb-8 sm:mb-12"
        />

        <div
          ref={scrollRef}
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
