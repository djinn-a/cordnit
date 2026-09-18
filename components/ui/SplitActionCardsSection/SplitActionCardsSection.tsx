import Button from "@/components/ui/Button/Button";
import { ArrowRight, Check } from "lucide-react";
import ActionCard, { type ActionCardData } from "./ActionCard";

export type SplitActionCardsSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: {
    label: string;
    href?: string;
  };
  supportingText?: string;
  listHeader?: {
    leftText: string;
    rightText?: string;
  };
  cards: ActionCardData[];
};

export type SplitActionCardsSectionProps = {
  data: SplitActionCardsSectionData;
};

export default function SplitActionCardsSection({ data }: SplitActionCardsSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1240px] flex flex-col lg:flex-row items-start justify-between gap-space-40 lg:gap-space-56">
        
        {/* Left Content Block */}
        <div className="flex flex-col gap-space-24 w-full lg:max-w-[480px] xl:max-w-[540px] flex-shrink-0">
          <div className="flex flex-col gap-space-16">
            <p className="text-eyebrow-mobile lg:text-page-hero-eyebrow text-brand-primary uppercase tracking-wider">
              {data.eyebrow}
            </p>
            <h2 className="text-section-title-mobile lg:text-section-title text-ink">
              {data.title}
            </h2>
          </div>
          
          <p className="text-section-subtitle-mobile lg:text-section-subtitle text-ink-muted">
            {data.subtitle}
          </p>

          <div className="flex flex-col gap-space-16 mt-space-8">
            <div className="w-fit">
              {/* Reuse existing Button */}
              <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {data.cta.label}
              </Button>
            </div>
            
            {data.supportingText && (
              <div className="flex items-center gap-space-8">
                <Check className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <p className="text-[12px] font-semibold text-ink-subtle">
                  {data.supportingText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Cards Block */}
        <div className="flex flex-col w-full gap-space-24">
          {/* List Header */}
          {data.listHeader && (
            <div className="flex items-center justify-between w-full border-l-2 border-brand-primary pl-space-8 py-1">
              <p className="text-card-detail-mobile sm:text-about-eyebrow-desktop text-brand-primary uppercase">
                {data.listHeader.leftText}
              </p>
              {data.listHeader.rightText && (
                <p className="text-card-detail-mobile sm:text-about-eyebrow-desktop text-ink-muted uppercase">
                  {data.listHeader.rightText}
                </p>
              )}
            </div>
          )}

          {/* Cards Stack */}
          <div className="flex flex-col gap-space-24 w-full">
            {data.cards.map((card) => (
              <ActionCard key={card.id} card={card} />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
