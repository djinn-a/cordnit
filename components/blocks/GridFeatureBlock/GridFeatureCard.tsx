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
        "relative flex flex-col h-full w-full p-space-32 rounded-card-grid transition-all duration-300",
        variant === "solid" 
          ? "bg-brand-pale border border-transparent"
          : "bg-surface border border-border-card"
      )}
    >
      {/* Icon */}
      {React.createElement(getLucideIcon(card.iconName), {
        className: "absolute top-space-32 right-space-32 w-space-24 h-space-24 text-brand-primary"
      })}

      {/* Number */}
      <div 
        className={cn(
          "text-brand-primary text-card-desc font-semibold font-mulish",
          variant === "solid" ? "mb-space-12" : "mb-space-16"
        )}
      >
        {card.numberStr}
      </div>

      {/* Title */}
      <h3 className="text-card-title-desktop text-ink font-mulish mb-space-12">
        {card.title}
      </h3>

      {/* Description */}
      <p className="text-card-desc text-ink-muted font-mulish grow">
        {card.description}
      </p>

      {/* Pills */}
      {card.pills && card.pills.length > 0 && (
        <div 
          className={cn(
            "flex flex-wrap gap-space-8 mt-auto",
            variant === "solid" ? "pt-space-32" : "pt-space-24"
          )}
        >
          {card.pills.map((pill) => (
            <span 
              key={pill}
              className="bg-brand-primary/10 text-brand-primary text-help-card-prefix font-mulish px-space-16 py-space-8 rounded"
            >
              {pill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
