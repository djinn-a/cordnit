import GridFeatureCard from "./GridFeatureCard";
import type { GridFeatureBlockProps } from "./types";

export default function GridFeatureBlock({ variant, header, cards }: Readonly<GridFeatureBlockProps>) {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-space-64 gap-space-24 lg:gap-0">
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

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-32 w-full">
          {cards.map((card, idx) => (
            <GridFeatureCard key={card.id || idx} card={card} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
