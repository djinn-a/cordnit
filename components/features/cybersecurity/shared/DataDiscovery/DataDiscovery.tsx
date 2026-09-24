import React from "react";
import type { DataDiscoveryProps } from "./types";
import { SplitFeatureBlock } from "@/components/blocks/SplitFeatureBlock";

export function DataDiscovery({ data, variant = "default" }: Readonly<DataDiscoveryProps>) {
  if (!data) return null;

  return (
    <SplitFeatureBlock 
      layout={variant === "alternate" ? "text-right" : "text-left"}
      textFeatureStyle={variant === "alternate" ? "cards" : "checkmarks"}
      mediaStyle={variant === "alternate" || variant === "steps" ? "numbered-steps" : "icon-cards"}
      textSection={{
        eyebrow: data.leftSection.eyebrow,
        title: data.leftSection.title,
        description: data.leftSection.description,
        features: data.leftSection.features.map(f => ({ text: f.text, title: f.title }))
      }}
      mediaSection={{
        eyebrow: data.rightSection.eyebrow,
        statusText: data.rightSection.statusText,
        cards: data.rightSection.cards.map(c => ({
          title: c.title,
          description: c.description,
          icon: c.icon,
          stepNumber: c.stepNumber
        })),
        footerBadges: data.rightSection.footerBadges || []
      }}
    />
  );
}
