import { cn } from "@/lib/utils/cn";
import PhaseFeatureCard from "./PhaseFeatureCard";
import type { PhaseFeatureBlockProps } from "./types";

export default function PhaseFeatureBlock({ header, cards, className, headerLayout = "split", cardStyle = "default" }: Readonly<PhaseFeatureBlockProps>) {
  const isStacked = headerLayout === "stacked";

  return (
    <section className={cn("w-full bg-surface", className)}>
      <div className="w-full flex flex-col">
        {/* Header */}
        <div className={cn(
          "flex w-full mb-space-24 md:mb-space-64",
          isStacked 
            ? "flex-col gap-space-16 md:gap-space-24 max-w-200" 
            : "flex-col lg:flex-row justify-between gap-space-8 md:gap-space-24 lg:gap-space-32"
        )}>
          <div className={cn("flex flex-col w-full gap-space-8 md:gap-space-16", !isStacked && "lg:w-3/5 xl:w-2/3")}>
            <p className="text-eyebrow-mobile md:text-page-hero-eyebrow text-brand-primary uppercase tracking-widest md:tracking-wider font-mulish">
              {header.eyebrow}
            </p>
            <h2 className="text-section-title-mobile md:text-split-section-title text-ink font-mulish whitespace-pre-wrap">
              {header.title}
            </h2>
          </div>
          <div className={cn("w-full flex flex-col", !isStacked && "lg:w-2/5 xl:w-1/3 lg:mt-auto justify-end")}>
            <p className="text-section-subtitle-mobile md:text-help-card-title-mobile text-ink-muted font-mulish mb-0">
              {header.description}
            </p>
          </div>
        </div>

        {/* Horizontal Row / Grid */}
        <div className={cn(
          "grid w-full items-stretch",
          (cardStyle === "pale-blue-compact" || cardStyle === "clean")
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center lg:justify-items-start" 
            : "grid-cols-2 xl:grid-cols-4 gap-space-12 md:gap-space-24"
        )}>
          {cards.map((card, idx) => (
            <PhaseFeatureCard key={card.id || idx} card={card} cardStyle={cardStyle} />
          ))}
        </div>
      </div>
    </section>
  );
}
