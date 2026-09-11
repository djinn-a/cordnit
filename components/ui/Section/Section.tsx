import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  background?: "white" | "pale" | "dark" | "transparent";
  spacing?: "none" | "sm" | "md" | "lg";
};

const backgroundClass = {
  white: "bg-surface",
  pale: "bg-primary-pale",
  dark: "bg-surface-dark text-white",
  transparent: "bg-transparent",
} as const;

const spacingClass = {
  none: "",
  sm: "py-8 sm:py-12 lg:py-16",
  md: "py-12 sm:py-16 lg:py-20 xl:py-24",
  lg: "py-16 sm:py-20 lg:py-24 xl:py-28",
} as const;

export default function Section({
  as: Tag = "section",
  background = "white",
  spacing = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        backgroundClass[background],
        spacingClass[spacing],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
