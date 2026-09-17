"use client";

import { useState } from "react";
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

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Topic selection */}
      <ExploreByTopic {...exploreByTopicProps} />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderedCards.map((card) => (
          <InsightCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
}
