import { cn } from "@/lib/utils/cn";
import { MethodologyStep } from "./methodologyData";

export type MethodologyCardProps = {
  step: MethodologyStep;
  className?: string;
};

export default function MethodologyCard({ step, className }: MethodologyCardProps) {
  const getBgClass = (num: string) => {
    switch (num) {
      case "01": return "bg-primary";
      case "02": return "bg-ink";
      case "03": return "bg-ink lg:bg-primary";
      case "04": return "bg-primary lg:bg-ink";
      case "05": return "bg-primary";
      default: return step.tone === "primary" ? "bg-primary" : "bg-ink";
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-[320px] xs:h-[340px] sm:h-panel p-4 sm:p-6 md:p-8 rounded-sm text-surface",
        getBgClass(step.num),
        className
      )}
    >
      <div className="flex justify-between items-start mb-6 lg:mb-8">
        <span className="text-caption eyebrow-desktop font-bold tracking-widest uppercase text-surface">
          {step.title}
        </span>
        <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-surface" />
      </div>
      <div className="text-numbers text-surface mt-6 xs:mt-8 sm:mt-0 leading-none">
        {step.num}
      </div>
      <div className="mt-6">
        <p className="text-about-eyebrow-desktop sm:text-card-desc lg:text-body-sm leading-relaxed text-surface/90">
          {step.desc}
        </p>
      </div>
    </div>
  );
}
