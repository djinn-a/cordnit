import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: "default" | "narrow" | "wide";
};

const widthClass = {
  default: "max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl",
  narrow: "max-w-container",
  wide: "max-w-container-wide",
} as const;

export default function Container({
  className,
  width = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto px-4 xs:px-5 sm:px-6 lg:px-8",
        widthClass[width],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
