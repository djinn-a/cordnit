import type { ContextApproachSectionProps } from "./ContextApproachSection.types";

export default function ContextApproachSection({
  eyebrow,
  title,
  description,
}: Readonly<ContextApproachSectionProps>) {
  return (
    <section className="w-full pt-6 px-6 md:pt-space-80 md:px-15">
        <div className="w-full mx-auto max-w-[352px] md:max-w-330 p-6 md:p-12 bg-grad-3 border border-primary/20 rounded-[17px] md:rounded-4xl">
          <div className="flex flex-col md:flex-row w-full md:w-305.75 max-w-full items-start md:items-center gap-4 md:gap-6 shrink-0 mx-auto">
            {/* Left Content */}
            <div className="w-full md:flex-[0_1_541px] flex flex-col gap-2 md:gap-4">
              {eyebrow && (
                <span className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop md:leading-none uppercase tracking-[1px] text-primary">
                  {eyebrow}
                </span>
              )}
              <h2 className="text-cta-title-mobile leading-[34px] md:text-section-title md:leading-[1.2] text-ink">{title}</h2>
            </div>

            {/* Divider */}
            <div className="w-[140px] h-px md:h-30 md:w-px bg-primary/30 md:bg-border-subtle shrink-0"></div>

            {/* Right Content */}
            <div className="w-full md:flex-[0_1_634px]">
              <p className="text-card-desc-mobile leading-4 md:text-section-subtitle text-ink-muted md:leading-7">
                {description}
              </p>
            </div>
          </div>
        </div>
    </section>
  );
}
