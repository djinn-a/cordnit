import { cn } from "@/lib/utils/cn";
import JourneyStepsCard from "./JourneyStepsCard";
import type { JourneyStepsBlockProps } from "./types";

export default function JourneyStepsBlock({ header, cards, className }: Readonly<JourneyStepsBlockProps>) {
  return (
    <section className={cn("w-full bg-surface", className)}>
      <div className="w-full flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-space-24 md:mb-space-64 gap-space-16 md:gap-space-24 lg:gap-space-60">
          <div className="flex flex-col w-full lg:w-3/5 xl:w-2/3 gap-space-8 md:gap-space-16">
            <p className="text-eyebrow-mobile tracking-widest text-brand-primary uppercase md:text-page-hero-eyebrow md:tracking-wider font-mulish">
              {header.eyebrow}
            </p>
            <h2 className="text-section-title-mobile text-ink md:text-split-section-title font-mulish">
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:w-2/5 xl:w-1/3 lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle-mobile text-ink-muted md:text-help-card-title-mobile font-mulish">
              {header.description}
            </p>
          </div>
        </div>

        {/* Horizontal Row / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-space-12 gap-y-space-16 md:gap-x-space-24 md:gap-y-space-24 w-full items-stretch">
          {cards.map((card, idx) => (
            <JourneyStepsCard key={card.id || idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
