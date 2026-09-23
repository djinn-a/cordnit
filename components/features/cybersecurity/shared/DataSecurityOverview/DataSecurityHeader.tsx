import type { DataSecurityOverviewData } from "./types";

export type DataSecurityHeaderProps = DataSecurityOverviewData["header"];

export function DataSecurityHeader({ eyebrow, title, description }: Readonly<DataSecurityHeaderProps>) {
  return (
    <div className="flex flex-col items-start w-full">
      <div className="w-fit flex items-center justify-center mb-[8px] md:mb-space-16">
        <span className="text-[10px] leading-[16px] md:text-page-hero-eyebrow md:leading-none text-brand-primary font-mulish font-extrabold uppercase tracking-[1px] md:tracking-normal">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-[24px] leading-[32px] md:text-split-section-title md:leading-[1.2] text-ink font-mulish font-extrabold mb-[8px] md:mb-space-20">
        {title}
      </h2>
      <p className="text-[14px] leading-[22px] md:text-page-hero-subtitle md:leading-normal text-ink-muted font-mulish font-normal max-w-5xl mb-[24px] md:mb-0">
        {description}
      </p>
    </div>
  );
}
