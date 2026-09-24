import type { PhaseFeatureCardData } from "./types";

interface PhaseFeatureCardProps {
  card: PhaseFeatureCardData;
}

export default function PhaseFeatureCard({ card }: Readonly<PhaseFeatureCardProps>) {
  return (
    <div className="flex flex-col h-full bg-white md:bg-surface border border-border-card rounded-xl p-space-20 md:p-space-32 hover:border-brand-primary md:hover:border-brand-primary/30 hover:shadow-sm transition-all duration-300">
      {/* Top Row: Number & Phase */}
      <div className="flex justify-between items-baseline">
        <span className="text-link-mobile md:text-section-title-head text-brand-primary font-semibold font-mulish">
          {card.numberStr}
        </span>
        <span className="text-stat-desc-mobile md:text-help-card-prefix uppercase text-ink-muted tracking-wider md:tracking-widest font-normal md:font-semibold font-mulish">
          {card.phaseLabel}
        </span>
      </div>

      {/* Divider */}
      <hr className="my-space-24 border-border-card" />

      {/* Content Area */}
      <div className="flex flex-col">
        <h3 className="text-section-title-head-mobile md:text-help-card-title-mobile text-ink font-bold md:font-semibold mt-0 mb-space-4 md:mb-space-12 font-mulish uppercase">
          {card.title}
        </h3>
        <p className="text-card-desc-mobile md:text-help-card-desc-mobile text-ink-muted font-normal font-mulish">
          {card.description}
        </p>
      </div>

      {/* Footer Text */}
      {card.footerText && (
        <div className="flex flex-col grow mt-space-12 md:mt-space-24 border-t border-border-card pt-space-12 md:pt-space-24">
          <p className="text-stat-desc-mobile md:text-card-desc-mobile font-normal text-ink-muted md:text-ink tracking-wider md:tracking-normal font-mulish mt-auto">
            {card.footerText}
          </p>
        </div>
      )}
    </div>
  );
}
