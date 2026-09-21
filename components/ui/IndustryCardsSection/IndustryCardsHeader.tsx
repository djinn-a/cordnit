import SectionHeader from "../SectionHeader/SectionHeader";
import type { IndustryCardsSectionProps } from "./IndustryCardsSection.types";

export default function IndustryCardsHeader({
  eyebrow,
  title,
  description,
  headerLayout,
}: Readonly<Pick<IndustryCardsSectionProps, "eyebrow" | "title" | "description" | "headerLayout">>) {
  if (headerLayout === "horizontal" && (title || description)) {
    return (
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-12">
        {title && (
          <h2 className="text-[24px] font-extrabold leading-32 md:text-[48px] md:leading-68 text-ink mb-3 md:mb-0 md:w-[48%] shrink-0">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-[14px] leading-22 md:text-[20px] md:leading-28 font-normal text-ink-muted md:w-[48%] mt-0 md:mt-1">
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
        className="mb-12"
        titleClassName="text-[24px] font-extrabold leading-32 md:text-[48px] md:leading-68 text-ink"
      />
    );
  }

  return null;
}
