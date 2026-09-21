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
  sm: "",
  md: "",
  lg: "",
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
