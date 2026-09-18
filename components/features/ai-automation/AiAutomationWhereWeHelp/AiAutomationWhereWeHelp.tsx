import { AiAutomationWhereWeHelpData } from "../data";
import AiAutomationWhereWeHelpCard from "./AiAutomationWhereWeHelpCard";

type AiAutomationWhereWeHelpProps = {
  data: AiAutomationWhereWeHelpData;
};

export default function AiAutomationWhereWeHelp({ data }: AiAutomationWhereWeHelpProps) {
  return (
    <section className="w-full bg-surface pb-space-50 flex flex-col items-start lg:items-center text-left">
      <div className="w-full max-w-container-xl px-space-16 md:px-space-32 lg:px-space-40 flex flex-col gap-space-48 md:gap-space-64 lg:gap-space-80">
        
        {/* Header Split Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row xl:justify-between items-start gap-space-32 md:gap-space-24 lg:gap-space-32">
          
          {/* Left Column (Eyebrow & Title) */}
          <div className="flex flex-col gap-space-12 md:gap-space-20 lg:gap-space-32 xl:w-[700px]">
            <span className="text-eyebrow-desktop lg:text-page-hero-eyebrow text-primary uppercase">
              {data.eyebrow}
            </span>
            <h2 className="text-section-title-mobile md:text-[32px] md:leading-[1.2] lg:text-split-section-title text-ink">
              {data.title}
            </h2>
          </div>
          
          {/* Right Column (Subtitle) */}
          <div className="w-full xl:w-[491px] md:mt-0 xl:mt-[84px]">
            <p className="text-section-subtitle-mobile lg:text-page-hero-subtitle text-ink-muted">
              {data.subtitle}
            </p>
          </div>
          
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-16 md:gap-space-32 lg:gap-space-56 w-full">
          {data.cards.map((card) => (
            <AiAutomationWhereWeHelpCard key={card.code} card={card} />
          ))}
        </div>
        
      </div>
    </section>
  );
}
