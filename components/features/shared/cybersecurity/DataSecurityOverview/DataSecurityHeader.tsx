import type { DataSecurityOverviewData } from "./types";

export type DataSecurityHeaderProps = DataSecurityOverviewData["header"];

export function DataSecurityHeader({ eyebrow, title, description }: Readonly<DataSecurityHeaderProps>) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-fit flex items-center justify-center">
        <span className="text-page-hero-eyebrow text-brand-primary font-mulish uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-split-section-title text-ink font-mulish mt-space-16">
        {title}
      </h2>
      <p className="text-page-hero-subtitle text-ink-muted font-mulish mt-space-20 max-w-5xl">
        {description}
      </p>
    </div>
  );
}
