import React from "react";
import { cn } from "@/lib/utils/cn";
import type { JourneyStepCardData } from "./types";

interface PipelineFlowCardProps {
  card: JourneyStepCardData;
}

export function PipelineFlowCard({ card }: Readonly<PipelineFlowCardProps>) {
  return (
    <div
      className={cn(
        "bg-white border border-border-card rounded-xl px-space-20 py-space-20",
        "w-full h-full min-h-[180px]",
        "flex flex-col shadow-sm"
      )}
    >
      <div className="flex justify-between items-center text-[12px] font-bold tracking-wider text-brand-primary uppercase mb-space-16">
        <span>{card.numberStr}</span>
        <span>{card.title}</span>
      </div>
      
      <div className="flex flex-col gap-space-12 mb-space-24">
        <h3 className="text-[18px] font-bold uppercase text-ink">
          {card.description}
        </h3>
        {card.subDescription && (
          <p className="text-sm font-normal text-ink-muted">
            {card.subDescription}
          </p>
        )}
      </div>
      
      <div className="mt-auto pt-space-16 border-t border-border-subtle flex items-center gap-space-8">
        {card.dots && card.dots.length > 0 && (
          <div className="flex gap-1 items-center">
            {card.dots.map((dot, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <span
                key={`dot-${idx}`}
                className={cn(
                  "block w-2 h-2 rounded-full",
                  dot === "blue" ? "bg-brand-primary" : "bg-ink-watermark"
                )}
              />
            ))}
          </div>
        )}
        {card.footerText && (
          <span className="text-sm font-normal text-ink-watermark">
            {card.footerText}
          </span>
        )}
      </div>
    </div>
  );
}
