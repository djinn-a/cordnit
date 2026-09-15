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
        "flex flex-col h-[320px] xs:h-[340px] sm:h-panel p-4 sm:p-6 md:p-8 rounded-sm text-surface",
        step.tone === "primary" ? "bg-primary" : "bg-ink",
        className
      )}
    >
      <div className="flex justify-between items-start mb-6 lg:mb-8">
        <span className="text-caption eyebrow-desktop font-bold tracking-widest uppercase text-surface">
          {step.title}
        </span>
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-surface" />
      </div>
      <div className="text-numbers text-surface mb-auto leading-none">
        {step.num}
      </div>
      <div className="mt-6">
        <p className="text-card-desc sm:text-body-sm leading-relaxed text-surface/90">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
