import React from "react";
import { getLucideIcon } from "@/lib/utils/icons";
import type { DataDiscoveryCardProps } from "./types";

export function DataDiscoveryCard({ icon, title, description }: Readonly<DataDiscoveryCardProps>) {
  return (
    <div className="flex w-full items-start gap-space-16 p-space-16 bg-surface border border-border-card rounded-card-sm shadow-help-card">
      <div className="shrink-0 w-space-40 h-space-40 rounded bg-brand-pale flex items-center justify-center">
        {React.createElement(getLucideIcon(icon), { className: "w-5 h-5 text-brand-primary" })}
      </div>
      <div className="flex flex-col gap-space-4 w-full pt-0.5">
        <h3 className="text-footer-heading-desktop text-ink uppercase font-mulish">
          {title}
        </h3>
        <p className="text-card-desc-mobile md:text-card-desc text-ink-muted font-mulish">
          {description}
        </p>
      </div>
    </div>
  );
}
