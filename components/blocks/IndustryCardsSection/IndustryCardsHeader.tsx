import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import type { IndustryCardsSectionProps } from "./IndustryCardsSection.types";

export default function IndustryCardsHeader({
  eyebrow,
  title,
  description,
  headerLayout,
}: Readonly<Pick<IndustryCardsSectionProps, "eyebrow" | "title" | "description" | "headerLayout">>) {
  if (headerLayout === "horizontal" && (title || description)) {
    return (
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-space-24 md:mb-space-48">
        {title && (
          <h2 className="text-[24px] font-extrabold leading-[32px] md:text-split-section-title text-ink mb-space-12 md:mb-0 md:w-[48%] shrink-0">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-[14px] leading-[22px] md:text-[20px] md:leading-[28px] font-normal text-ink-muted md:w-[48%] mt-0 md:mt-1">
            {description}
          </p>
        )}
      </div>
    );
  }

  if (eyebrow || title || description) {
    return (
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={description}
        className="mb-space-48"
        titleClassName="text-[24px] font-extrabold leading-[32px] md:text-split-section-title text-ink"
      />
    );
  }

  return null;
}
