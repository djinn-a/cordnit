import type { ContextApproachSectionProps } from "./ContextApproachSection.types";

export default function ContextApproachSection({
  eyebrow,
  title,
  description,
}: Readonly<ContextApproachSectionProps>) {
  return (
    <section className="w-full pt-space-80 px-15">
        <div className="w-full mx-auto max-w-330 p-12 bg-grad-3 border border-primary/20 rounded-4xl">
          <div className="flex w-305.75 max-w-full items-center gap-6 shrink-0 mx-auto">
            {/* Left Content */}
            <div className="flex-[0_1_541px] flex flex-col gap-4">
              {eyebrow && (
                <span className="text-eyebrow-desktop uppercase tracking-[1px] text-primary">
                  {eyebrow}
                </span>
              )}
              <h2 className="text-section-title text-ink">{title}</h2>
            </div>

            {/* Vertical Divider */}
            <div className="h-30 w-px bg-border-subtle shrink-0"></div>

            {/* Right Content */}
            <div className="flex-[0_1_634px]">
              <p className="text-section-subtitle text-ink-muted leading-7">
                {description}
              </p>
            </div>
          </div>
        </div>
    </section>
  );
}
