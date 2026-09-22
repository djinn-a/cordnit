import type { ContentInsightsProps } from "./ContentInsights.types";
import ContentInsightsInteractive from "./ContentInsightsInteractive";
import FeaturedInsightCard from "./FeaturedInsightCard";
import Container from "@/components/ui/Container/Container";

export default function ContentInsights({
  eyebrow,
  featured,
  exploreByTopic,
  insightCards,
}: Readonly<ContentInsightsProps>) {
  return (
    <section className="w-full">
      <Container>
        {/* Section Eyebrow */}
        {eyebrow && (
          <h2 className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-4 md:mb-6">
            {eyebrow}
          </h2>
        )}

        {/* Featured Card */}
        <FeaturedInsightCard featured={featured} />

        {/* Interactive Block (Topics + Cards) */}
        {exploreByTopic && insightCards && (
          <ContentInsightsInteractive 
            exploreByTopic={exploreByTopic} 
            insightCards={insightCards} 
          />
        )}

      </Container>
    </section>
  );
}
