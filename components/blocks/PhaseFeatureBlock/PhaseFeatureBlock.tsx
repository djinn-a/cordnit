import { cn } from "@/lib/utils/cn";
import PhaseFeatureCard from "./PhaseFeatureCard";
import type { PhaseFeatureBlockProps } from "./types";

export default function PhaseFeatureBlock({ header, cards, className }: PhaseFeatureBlockProps) {
  return (
    <section className={cn("w-full bg-surface", className)}>
      <div className="w-full flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-[64px] gap-space-24 lg:gap-0">
          <div className="flex flex-col w-full lg:max-w-[45%] xl:max-w-[40%] gap-space-16">
            <p className="text-page-hero-eyebrow text-brand-primary uppercase tracking-wider">
              {header.eyebrow}
            </p>
            <h2 className="text-section-title text-ink font-mulish">
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:max-w-[50%] lg:mt-auto flex flex-col justify-end">
            <p className="text-section-subtitle text-ink-muted font-mulish">
              {header.description}
            </p>
          </div>
        </div>

        {/* Horizontal Row / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px] w-full items-stretch">
          {cards.map((card, idx) => (
            <PhaseFeatureCard key={card.id || idx} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
