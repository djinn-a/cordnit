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
        "bg-brand-pale rounded-xl px-space-20 py-space-16",
        "w-full h-full min-h-[140px]",
        "flex flex-col justify-between"
      )}
    >
      <div>
        <div className="text-[12px] font-normal leading-space-16 text-ink-muted uppercase mb-space-8">
          {card.numberStr}
        </div>
        <h3 className="text-base font-bold uppercase text-ink">
          {card.title}
        </h3>
      </div>
      
      <div className="mt-auto flex items-center gap-space-8 pt-space-32">
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
        {(card.footerText || card.description) && (
          <span className="text-sm font-normal text-ink-muted">
            {card.footerText || card.description}
          </span>
        )}
      </div>
    </div>
  );
}
