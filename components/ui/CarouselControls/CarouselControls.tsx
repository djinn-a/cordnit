"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type CarouselControlsProps = {
  count: number;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick?: (index: number) => void;
  canScrollPrev?: boolean;
  canScrollNext?: boolean;
  size?: "sm" | "md";
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
};

export default function CarouselControls({
  count,
  activeIndex,
  onPrev,
  onNext,
  onDotClick,
  canScrollPrev = true,
  canScrollNext = true,
  size = "md",
  className,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
}: Readonly<CarouselControlsProps>) {
  const isSm = size === "sm";
  const dotSize = isSm ? "w-1.5 h-1.5" : "w-2 h-2 sm:w-1.5 sm:h-1.5";
  const buttonSize = isSm
    ? "w-8 h-8"
    : "w-8 h-8 sm:w-10 sm:h-10";
  const iconSize = isSm ? "h-4 w-4" : "h-4 w-4 sm:h-5 sm:w-5";
  const gapDots = isSm ? "space-x-1.5" : "space-x-1.5 sm:space-x-2";
  const gapButtons = isSm ? "space-x-3" : "space-x-2 sm:space-x-3";

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      role="group"
      aria-label="Carousel controls"
    >
      <div className={cn("flex items-center", gapDots)} role="tablist" aria-label="Slides">
        {Array.from({ length: count }, (_, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => onDotClick?.(index)}
              disabled={!onDotClick}
              className={cn(
                "relative flex items-center justify-center rounded-full transition-colors",
                "before:absolute before:-inset-2 before:content-['']",
                dotSize,
                isActive ? "bg-ink" : "bg-border-subtle",
                onDotClick
                  ? "cursor-pointer hover:bg-ink/70"
                  : "pointer-events-none"
              )}
            />
          );
        })}
      </div>

      <div className={cn("flex items-center", gapButtons)}>
        <button
          type="button"
          onClick={onPrev}
          disabled={!canScrollPrev}
          className={cn(
            "flex items-center justify-center rounded-full border border-border-subtle transition-colors",
            buttonSize,
            canScrollPrev
              ? "text-ink-muted hover:text-ink hover:border-ink"
              : "text-ink-subtle cursor-not-allowed"
          )}
          aria-label={prevLabel}
        >
          <ArrowLeft className={iconSize} />
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canScrollNext}
          className={cn(
            "flex items-center justify-center rounded-full border border-border-subtle transition-colors",
            buttonSize,
            canScrollNext
              ? "text-ink-muted hover:text-ink hover:border-ink"
              : "text-ink-subtle cursor-not-allowed"
          )}
          aria-label={nextLabel}
        >
          <ArrowRight className={iconSize} />
        </button>
      </div>
    </div>
  );
}
