import React from "react";
import ProcessStepCard, { ProcessStepItem } from "./ProcessStepCard";

export type ProcessStepsProps = {
  steps: ProcessStepItem[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-space-40 lg:gap-0 relative mt-[64px]">
      {/* Background connecting line for desktop */}
      <div className="hidden lg:block absolute top-[32px] left-[15%] right-[15%] h-[1px] border-t border-dashed border-[#A7C0FF] z-0" />
      
      {steps.map((step) => (
        <div key={step.id} className="relative z-10 w-full flex justify-center">
          <ProcessStepCard step={step} />
        </div>
      ))}
    </div>
  );
}
