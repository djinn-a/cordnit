import type { DataSecurityOverviewData } from "./types";

export type DataSecurityHeaderProps = DataSecurityOverviewData["header"];

export function DataSecurityHeader({ eyebrow, title, description }: Readonly<DataSecurityHeaderProps>) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-fit flex items-center justify-center mb-space-8 md:mb-space-16">
        <span className="text-eyebrow-mobile tracking-widest md:text-page-hero-eyebrow md:leading-none text-brand-primary md:tracking-normal font-mulish uppercase">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-section-title-mobile md:text-split-section-title text-ink font-mulish mb-space-8 md:mb-space-20">
        {title}
      </h2>
      <p className="text-section-subtitle-mobile md:text-page-hero-subtitle text-ink-muted font-mulish max-w-5xl mb-0">
        {description}
      </p>
    </div>
  );
}
