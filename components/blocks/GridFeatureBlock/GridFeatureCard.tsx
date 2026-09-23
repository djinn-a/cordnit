import React from "react";
import { cn } from "@/lib/utils/cn";
import { getLucideIcon } from "@/lib/utils/icons";
import type { GridFeatureCardData } from "./types";

interface GridFeatureCardProps {
  card: GridFeatureCardData;
  variant: "solid" | "outline";
}

export default function GridFeatureCard({ card, variant }: Readonly<GridFeatureCardProps>) {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full w-full p-[20px] md:p-space-32 rounded-[10px] md:rounded-card-grid transition-all duration-300",
        variant === "solid" 
          ? "bg-[#EEF4FF] md:bg-brand-pale border border-transparent"
          : "bg-white md:bg-surface border border-border-card"
      )}
    >
      {/* Icon */}
      {React.createElement(getLucideIcon(card.iconName), {
        className: "absolute top-[20px] md:top-space-32 right-[20px] md:right-space-32 w-[13.33px] h-[12px] md:w-space-24 md:h-space-24 text-[#2251FF] md:text-brand-primary"
      })}

      {/* Number */}
      <div 
        className={cn(
          "text-[#2251FF] md:text-brand-primary text-[10px] md:text-card-desc font-[600] md:font-semibold font-mulish leading-[14px] md:leading-normal",
          "mb-[8px] md:mb-space-12"
        )}
      >
        {card.numberStr}
      </div>

      {/* Title */}
      <h3 className="text-[14px] md:text-card-title-desktop text-[#000] md:text-ink font-[700] md:font-semibold leading-[22px] md:leading-normal font-mulish mb-[8px] md:mb-space-12">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-[12px] md:text-card-desc text-[#555] md:text-ink-muted font-[400] md:font-normal leading-[16px] md:leading-normal font-mulish grow">
        {card.description}
      </p>

      {/* Pills */}
      {card.pills && card.pills.length > 0 && (
        <div 
          className={cn(
            "flex flex-wrap gap-[5px] md:gap-space-8 mt-auto",
            variant === "solid" ? "pt-[20px] md:pt-space-32" : "pt-[20px] md:pt-space-24"
          )}
        >
          {card.pills.map((pill) => (
            <span 
              key={pill}
              className="bg-[#2251FF]/10 md:bg-brand-primary/10 text-[#2251FF] md:text-brand-primary text-[10px] md:text-help-card-prefix font-[400] md:font-normal leading-[14px] md:leading-normal tracking-[0.6px] md:tracking-normal font-mulish px-[8px] py-[4px] md:px-space-16 md:py-space-8 rounded"
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
