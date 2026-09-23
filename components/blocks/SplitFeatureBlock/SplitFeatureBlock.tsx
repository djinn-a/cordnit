import React from "react";
import type { SplitFeatureBlockProps } from "./types";
import { SplitFeatureText } from "./SplitFeatureText";
import { SplitFeatureMedia } from "./SplitFeatureMedia";

export function SplitFeatureBlock({
  layout = "text-left",
  textFeatureStyle = "checkmarks",
  mediaStyle = "icon-cards",
  textSection,
  mediaSection,
}: Readonly<SplitFeatureBlockProps>) {
  return (
    <section className="w-full">
      <div 
        className={`flex flex-col lg:flex-row gap-space-40 w-full ${
          layout === "text-right" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <SplitFeatureText 
          {...textSection} 
          textFeatureStyle={textFeatureStyle}
        />
        <SplitFeatureMedia 
          {...mediaSection} 
          mediaStyle={mediaStyle}
        />
      </div>
    </section>
  );
}
