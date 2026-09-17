import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ContentInsightsProps } from "./ContentInsights.types";
import ContentInsightsInteractive from "./ContentInsightsInteractive";

export default function ContentInsights({
  eyebrow,
  featured,
  exploreByTopic,
  insightCards,
}: Readonly<ContentInsightsProps>) {
  return (
    <section className="w-full pt-space-80 px-space-60">
      <div className="w-full mx-auto max-w-7xl">
        {/* Section Eyebrow */}
        {eyebrow && (
          <h2 className="text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-6">
            {eyebrow}
          </h2>
        )}

        {/* Featured Card */}
        <div className="w-full flex items-center bg-grad-3 border border-primary/20 rounded-4xl p-10 gap-[146px] mb-8">
          
          {/* Left Media */}
          <div className="relative w-[486.462px] h-70 shrink-0 overflow-hidden rounded-xl">
            <Image 
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content Column */}
          <div className="flex-1 max-w-[519px] h-[302px] flex flex-col justify-between items-start py-[39px]">
            {/* Metadata */}
            <div className="flex items-center gap-3">
              {featured.articleLabel && (
                <span className="uppercase tracking-[1px] text-about-eyebrow-desktop text-primary font-semibold">
                  {featured.articleLabel}
                </span>
              )}
              {featured.category && (
                <span className="px-2.75 py-1.25 border border-border-card rounded-full bg-surface text-[12px] font-semibold text-ink-muted">
                  {featured.category}
                </span>
              )}
            </div>

            {/* Heading */}
            <h3 className="text-[32px] font-bold leading-[40px] text-ink">
              {featured.title}
            </h3>

            {/* Abstract & CTA */}
            <div className="flex flex-col gap-4">
              <p className="text-[16px] leading-[24px] text-ink-muted">
                {featured.description}
              </p>

              {featured.cta && (
                <div className="flex items-center gap-2 text-[16px] font-semibold leading-[24px] text-primary cursor-pointer">
                  <span>{featured.cta.label}</span>
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Block (Topics + Cards) */}
        {exploreByTopic && insightCards && (
          <ContentInsightsInteractive 
            exploreByTopic={exploreByTopic} 
            insightCards={insightCards} 
          />
        )}
      </div>
    </section>
  );
}
