import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  titleAs?: "h1" | "h2" | "h3";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const titleClass = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  titleAs = "h2",
  className,
  eyebrowClassName,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const TitleTag = titleAs;

  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("text-eyebrow mb-1 sm:mb-2", eyebrowClassName)}>
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className={cn(titleClass[titleAs], titleClassName)}>
        {title}
      </TitleTag>
      {subtitle ? (
        <div className={cn("text-body-lg max-w-2xl", subtitleClassName)}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
