import { cn } from "@/lib/utils/cn";
import { MethodologyStep } from "./methodologyData";

export type MethodologyCardProps = {
  step: MethodologyStep;
  className?: string;
};

export default function MethodologyCard({ step, className }: MethodologyCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-55 xs:h-60 sm:h-panel p-4 sm:p-6 md:p-8 rounded-sm text-surface",
        // Mobile bg (< lg)
        step.mobileTone === "primary" ? "bg-primary lg:bg-inherit" : "bg-ink lg:bg-inherit",
        // Desktop bg (lg+)
        step.tone === "primary" ? "lg:bg-primary" : "lg:bg-ink",
        className
      )}
    >
      <div className="flex justify-between items-start mb-auto">
        <span className="text-caption font-bold tracking-widest uppercase text-surface">
          {step.title}
        </span>
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-surface" />
      </div>
      <div className="mt-auto">
        <div className="text-48px font-700 text-surface mb-2 sm:mb-4 leading-none">
          {step.num}
        </div>
        <p className="text-caption sm:text-body-sm lg:text-16px leading-relaxed text-surface/90">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
