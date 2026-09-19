import { ArrowRight } from "lucide-react";
import Image from "next/image";
import type { ContentInsightsProps } from "./ContentInsights.types";
import ContentInsightsInteractive from "./ContentInsightsInteractive";
import Container from "../Container/Container";

export default function ContentInsights({
  eyebrow,
  featured,
  exploreByTopic,
  insightCards,
}: Readonly<ContentInsightsProps>) {
  return (
    <section className="w-full pt-6 pb-20 md:pt-space-80">
      <Container>
        {/* Section Eyebrow */}
        {eyebrow && (
          <h2 className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop uppercase tracking-[1px] text-primary mb-4 md:mb-6">
            {eyebrow}
          </h2>
        )}

        {/* Featured Card */}
        <div className="w-full flex flex-col md:flex-row md:items-center bg-grad-3 border border-border-card md:border-primary/20 rounded-[20px] md:rounded-4xl p-6 md:py-10 md:px-15 gap-6 md:gap-8 lg:gap-36.5 mb-8 shadow-card md:shadow-none">
          
          {/* Left Media (Order 2 on Mobile) */}
          <div className="relative w-full aspect-16/10 md:w-1/2 lg:w-[486.462px] md:h-auto lg:h-70 lg:shrink-0 overflow-hidden rounded-[7.6px] md:rounded-xl order-last md:order-0 bg-primary">
            <Image 
              src={featured.image.src}
              alt={featured.image.alt}
              fill
              className="object-cover scale-[1.147] md:scale-100"
            />
            {/* Mobile Image Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-[#02061780] to-transparent md:hidden" />
          </div>

          {/* Right Content Column */}
          <div className="flex-1 w-full lg:max-w-[599px] h-auto lg:h-[302px] flex flex-col justify-center items-start py-0 md:py-6 lg:p-[40px]">
            {/* Metadata */}
            <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-0">
              {featured.articleLabel && (
                <span className="uppercase tracking-[1px] text-link-card-mobile md:text-about-eyebrow-desktop text-primary font-semibold">
                  {featured.articleLabel}
                </span>
              )}
              {featured.category && (
                <span className="px-1.75 py-1.25 md:px-2.75 md:py-1.25 border border-border-card rounded-full bg-surface text-link-card-mobile md:text-[12px] font-semibold text-ink-muted">
                  {featured.category}
                </span>
              )}
            </div>

            {/* Heading */}
            <h3 className="text-card-title-mobile leading-7 md:text-[32px] md:font-bold md:leading-10 text-ink mb-4 md:mb-0">
              {featured.title}
            </h3>

            {/* Abstract & CTA */}
            <div className="flex flex-col gap-4">
              <p className="text-section-subtitle-mobile leading-5.5 md:text-[16px] md:leading-6 text-ink-muted">
                {featured.description}
              </p>

              {featured.cta && (
                <div className="flex items-center gap-1 md:gap-2 text-link-card-mobile md:text-[16px] font-semibold md:leading-6 text-primary cursor-pointer">
                  <span>{featured.cta.label}</span>
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
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

      </Container>
    </section>
  );
}
