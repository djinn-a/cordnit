import Image from "next/image";
import { AiAutomationWhereWeHelpData } from "../data";

type AiAutomationWhereWeHelpCardProps = {
  card: AiAutomationWhereWeHelpData["cards"][0];
};

export default function AiAutomationWhereWeHelpCard({ card }: AiAutomationWhereWeHelpCardProps) {
  return (
    <div className="bg-surface border border-border-card rounded-card-sm shadow-help-card p-space-16 md:p-space-24 lg:p-space-32 relative overflow-hidden flex flex-col h-full min-h-[201px]">
      <div className="flex justify-between items-start mb-space-16">
        <div className="flex items-center gap-space-4">
          <span className="text-help-card-prefix-blue-mobile lg:text-help-card-prefix text-primary">{card.code}</span>
          <span className="text-[12px] lg:text-[16px] leading-[24px] text-border-card">/</span>
          <span className="text-help-card-prefix-mobile lg:text-help-card-prefix text-ink-muted uppercase">{card.category}</span>
        </div>
        <Image 
          src={card.icon} 
          alt={`${card.category} icon`} 
          width={24} 
          height={24} 
          className="object-contain shrink-0"
        />
      </div>
      
      <h3 className="text-help-card-title-mobile md:text-help-card-title-desktop lg:text-help-card-title text-ink mb-space-8 md:mb-space-12 lg:mb-space-16 pr-space-16 relative z-10">
        {card.title}
      </h3>
      
      <p className="text-help-card-desc-mobile lg:text-card-desc text-ink-muted relative z-10 mb-space-8 lg:mb-0">
        {card.description}
      </p>

      {/* Decorative Watermark Number */}
      <div 
        className="absolute bottom-space-16 lg:bottom-space-24 right-space-16 lg:right-space-24 text-numbers-mobile lg:text-numbers text-ink-watermark leading-none pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        {card.number}
      </div>
    </div>
  );
}
