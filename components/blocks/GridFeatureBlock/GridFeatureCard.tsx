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
        "relative flex flex-col h-full w-full p-space-20 md:p-space-32 rounded-xl md:rounded-card-grid transition-all duration-300",
        variant === "solid" 
          ? "bg-brand-pale border border-transparent"
          : "bg-surface border border-border-card"
      )}
    >
      {/* Icon */}
      {React.createElement(getLucideIcon(card.iconName), {
        className: "absolute top-space-20 md:top-space-32 right-space-20 md:right-space-32 w-4 h-4 md:w-space-24 md:h-space-24 text-brand-primary"
      })}

      {/* Number */}
      <div 
        className={cn(
          "text-brand-primary text-link-card-mobile md:text-card-desc md:font-semibold font-mulish",
          "mb-space-8 md:mb-space-12"
        )}
      >
        {card.numberStr}
      </div>

      {/* Title */}
      <h3 className="text-section-title-head-mobile md:text-help-card-title-mobile text-ink md:font-semibold font-mulish mb-space-8 md:mb-space-12">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-card-desc-mobile md:text-help-card-desc-mobile text-ink-muted md:font-normal font-mulish grow">
        {card.description}
      </p>

      {/* Pills */}
      {card.pills && card.pills.length > 0 && (
        <div 
          className={cn(
            "flex flex-wrap gap-space-4 md:gap-space-8 mt-auto",
            variant === "solid" ? "pt-space-20 md:pt-space-32" : "pt-space-20 md:pt-space-24"
          )}
        >
          {card.pills.map((pill) => (
            <span 
              key={pill}
              className="bg-brand-primary/10 text-brand-primary text-stat-desc-mobile md:text-help-card-prefix md:font-normal tracking-widest md:tracking-normal font-mulish px-space-8 py-space-4 md:px-space-16 md:py-space-8 rounded"
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
