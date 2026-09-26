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
        "bg-[#F0F5FF] px-space-20 py-space-20",
        "rounded-[8px] border border-solid border-[0.549px] border-[#DCE6F5] shadow-[0_0.549px_1.098px_0_rgba(0,0,0,0.05)]",
        "w-full h-full min-h-[160px]",
        "flex flex-col"
      )}
    >
      <div className="text-[10px] md:text-[12px] font-bold tracking-wider text-[#666666] uppercase mb-space-12 md:mb-space-16">
        {card.numberStr}
      </div>
      
      <div className="flex flex-col gap-space-12 mb-space-24">
        <h3 className="text-[14px] leading-[22px] font-bold font-mulish md:text-[20px] md:leading-normal md:font-bold uppercase text-black">
          {card.title}
        </h3>
        {card.description && (
          <p className="text-sm font-normal text-ink-muted">
            {card.description}
          </p>
        )}
      </div>
      
      <div className="mt-auto pt-space-16 flex items-center gap-space-8">
        {card.dots && card.dots.length > 0 && (
          <div className="flex gap-1 items-center">
            {card.dots.map((dot, idx) => (
              <span
                key={`dot-${idx}`}
                className={cn(
                  "block w-2 h-2 rounded-full",
                  dot === "blue" ? "bg-[#2251FF]" : "bg-[#D1D5DB]"
                )}
              />
            ))}
          </div>
        )}
        {card.footerText && (
          <span className="text-[10px] leading-[14px] font-normal font-mulish text-[#555] md:text-sm md:leading-normal md:text-[#666666]">
            {card.footerText}
          </span>
        )}
      </div>
    </div>
  );
}
