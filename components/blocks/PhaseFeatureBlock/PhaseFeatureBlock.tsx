import { cn } from "@/lib/utils/cn";
import PhaseFeatureCard from "./PhaseFeatureCard";
import type { PhaseFeatureBlockProps } from "./types";

export default function PhaseFeatureBlock({ header, cards, className }: Readonly<PhaseFeatureBlockProps>) {
  return (
    <section className={cn("w-full bg-surface", className)}>
      <div className="w-full flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-space-24 md:mb-space-64 gap-space-8 md:gap-space-24 lg:gap-space-32">
          <div className="flex flex-col w-full lg:w-3/5 xl:w-2/3 gap-space-8 md:gap-space-16">
            <p className="text-eyebrow-mobile md:text-page-hero-eyebrow text-brand-primary uppercase tracking-widest md:tracking-wider font-mulish">
              {header.eyebrow}
            </p>
            <h2 className="text-section-title-mobile md:text-split-section-title text-ink font-mulish">
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:w-2/5 xl:w-1/3 lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle-mobile md:text-help-card-title-mobile text-ink-muted font-mulish">
              {header.description}
            </p>
          </div>
        </div>

        {/* Horizontal Row / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-24 w-full items-stretch">
          {cards.map((card, idx) => (
            <PhaseFeatureCard key={card.id || idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
