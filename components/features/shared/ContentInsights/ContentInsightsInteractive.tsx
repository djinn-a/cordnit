"use client";

import { useState, useRef } from "react";
import { ArrowRightCircle } from "lucide-react";
import type { ExploreByTopicProps, InsightCardData } from "./ContentInsights.types";
import ExploreByTopic from "./ExploreByTopic";
import InsightCard from "./InsightCard";

interface ContentInsightsInteractiveProps {
  exploreByTopic: ExploreByTopicProps;
  insightCards: InsightCardData[];
}

export default function ContentInsightsInteractive({
  exploreByTopic,
  insightCards,
}: Readonly<ContentInsightsInteractiveProps>) {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Map the topics to include the isActive state based on selectedTopic
  const topicsWithActiveState = exploreByTopic.topics.map((topic) => ({
    ...topic,
    isActive: topic.id === selectedTopic,
  }));

  const exploreByTopicProps: ExploreByTopicProps = {
    ...exploreByTopic,
    topics: topicsWithActiveState,
    onSelectTopic: setSelectedTopic,
  };

  // Reorder cards: matching topics first (stable sort logic)
  const orderedCards =
    selectedTopic === "all"
      ? insightCards
      : [
          ...insightCards.filter((card) => card.topic === selectedTopic),
          ...insightCards.filter((card) => card.topic !== selectedTopic),
        ];

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // If we are at or very near the end, loop back to the start
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 170, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Topic selection */}
      <ExploreByTopic {...exploreByTopicProps} />

      {/* Cards Grid Container */}
      <div className="relative w-full">
        <div 
          ref={scrollRef}
          className="w-83 md:w-auto flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory hide-scrollbar md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 pb-4 md:pb-0"
        >
          {orderedCards.map((card) => (
            <div key={card.id} className="w-40.5 md:w-auto shrink-0 snap-start">
              <InsightCard {...card} />
            </div>
          ))}
        </div>
        
        {/* Mobile Next Button (Always visible, loops back to start) */}
        <button 
          onClick={scrollRight}
          className="md:hidden absolute -right-1 top-1/2 -translate-y-1/2 flex items-center justify-center bg-white/80 rounded-full text-blue-600 shadow-sm z-10 p-0.5"
          aria-label="Scroll right or loop back"
        >
          <ArrowRightCircle size={28} strokeWidth={1.5} fill="white" />
        </button>
      </div>
    </div>
  );
}
