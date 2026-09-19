import type { ContextApproachSectionProps } from "./ContextApproachSection.types";
import Container from "../Container/Container";

export default function ContextApproachSection({
  eyebrow,
  title,
  description,
}: Readonly<ContextApproachSectionProps>) {
  return (
    <section className="w-full pt-6 md:pt-space-80">
      <Container>
        <div className="w-full h-auto p-6 md:py-12 md:px-15 bg-grad-3 border border-border-card rounded-[17px] md:rounded-4xl">
          <div className="flex flex-col md:flex-row w-full md:w-305.75 max-w-full items-start md:items-center gap-3 md:gap-6 shrink-0 mx-auto">
            {/* Left Content */}
            <div className="w-full md:flex-[0_1_541px] flex flex-col gap-2 md:gap-4">
              {eyebrow && (
                <span className="text-eyebrow-mobile leading-4 md:text-eyebrow-desktop md:leading-none uppercase tracking-[1px] text-primary">
                  {eyebrow}
                </span>
              )}
              <h2 className="text-[20px] leading-[28px] md:text-section-title md:leading-[1.2] text-ink font-extrabold">{title}</h2>
            </div>

            {/* Divider */}
            <div className="w-35 h-px md:h-30 md:w-px bg-border-card shrink-0"></div>

            {/* Right Content */}
            <div className="w-full md:flex-[0_1_634px]">
              <p className="text-[14px] leading-[22px] md:text-section-subtitle text-ink-muted md:leading-7">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
