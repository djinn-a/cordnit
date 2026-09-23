import GridFeatureCard from "./GridFeatureCard";
import type { GridFeatureBlockProps } from "./types";

export default function GridFeatureBlock({ variant, header, cards }: Readonly<GridFeatureBlockProps>) {
  return (
    <section className="w-full">
      <div className="w-full flex flex-col">
        {/* Split Header */}
        <div className="flex flex-col lg:flex-row justify-between w-full mb-[24px] md:mb-space-64 gap-[8px] md:gap-space-24 lg:gap-0">
          <div className="flex flex-col w-full lg:max-w-[45%] xl:max-w-[40%] gap-[8px] md:gap-space-16">
            <p className="text-[10px] md:text-page-hero-eyebrow text-[#2251FF] md:text-brand-primary uppercase font-[800] md:font-semibold tracking-[1px] md:tracking-wider leading-[16px] md:leading-normal font-mulish">
              {header.eyebrow}
            </p>
            <h2 className="text-[24px] md:text-section-title text-[#000] md:text-ink font-[800] md:font-semibold leading-[32px] md:leading-normal font-mulish">
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:max-w-[50%] lg:mt-auto flex flex-col justify-end">
            <p className="text-[14px] md:text-section-subtitle text-[#555] md:text-ink-muted font-[400] md:font-normal leading-[22px] md:leading-normal font-mulish">
              {header.description}
            </p>
          </div>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] md:gap-space-32 w-full">
          {cards.map((card, idx) => (
            <GridFeatureCard key={card.id || idx} card={card} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}
