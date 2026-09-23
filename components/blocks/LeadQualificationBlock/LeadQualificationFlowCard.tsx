import { cn } from "@/lib/utils/cn";
import type { LeadQualificationStep } from "./types";

interface LeadQualificationFlowCardProps {
  step: LeadQualificationStep;
  isGrid?: boolean;
}

export default function LeadQualificationFlowCard({ step, isGrid }: Readonly<LeadQualificationFlowCardProps>) {
  if (isGrid) {
    return (
      <div className={cn(
        "flex flex-col rounded-2xl p-space-24 border w-full h-full justify-between gap-space-16",
        step.theme === "blue" 
          ? "bg-brand-primary text-white border-brand-primary" 
          : "bg-white border-border-card shadow-sm text-ink"
      )}>
        <div className="flex flex-col gap-space-4">
          <span className={cn(
            "text-[12px] font-normal leading-[16px] uppercase font-mulish",
            step.theme === "blue" ? "text-white/80" : "text-brand-primary"
          )}>
            {step.numberStr}
          </span>
          <h3 className={cn(
            "text-base font-bold uppercase font-mulish",
            step.theme === "blue" ? "text-white" : "text-ink"
          )}>
            {step.title}
          </h3>
        </div>
        <p className={cn(
          "text-sm font-normal font-mulish",
          step.theme === "blue" ? "text-white/80" : "text-ink-muted"
        )}>
          {step.description}
        </p>
      </div>
    );
  }

  if (!step.numberStr) {
    return (
      <div className="flex bg-white rounded-2xl p-space-16 md:p-space-24 border border-border-card shadow-sm w-full items-center justify-between gap-space-16">
        <h3 className="text-base font-bold leading-normal text-ink uppercase font-mulish shrink-0">
          {step.title}
        </h3>
        <p className="text-sm font-normal text-ink-muted font-mulish text-right">
          {step.description}
        </p>
      </div>
    );
  }

  return (
    <div className="flex bg-white rounded-2xl p-space-24 border border-border-card shadow-sm w-full">
      <div className="flex items-start gap-space-16 md:gap-space-24">
        {/* Number Badge */}
        <span className="flex shrink-0 items-center justify-center bg-brand-pale text-brand-primary text-stat-desc-mobile md:text-section-title-head md:font-semibold font-mulish rounded-lg w-10 h-10 md:w-12 md:h-12">
          {step.numberStr}
        </span>
        
        {/* Content */}
        <div className="flex flex-col gap-space-4 mt-1">
          <h3 className="text-base font-bold leading-normal text-ink uppercase font-mulish">
            {step.title}
          </h3>
          <p className="text-sm font-normal text-ink-muted font-mulish">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}
