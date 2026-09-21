import React from "react";
import ProcessStepCard, { ProcessStepItem } from "./ProcessStepCard";

export type ProcessStepsProps = {
  steps: ProcessStepItem[];
};

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-full gap-space-40 lg:gap-0 relative mt-[64px]">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          {/* The Step Card */}
          <div className="relative z-10 w-full flex justify-center">
            <ProcessStepCard step={step} />
          </div>

          {/* The Connecting Line (Only between items on Desktop) */}
          {index < steps.length - 1 && (
            <div className="hidden lg:flex items-center absolute top-[32px] z-0" style={{ left: `calc(${(index * 33.33) + 16.66}% + 48px)`, width: `calc(33.33% - 96px)` }}>
              <div className="w-[4px] h-[4px] rounded-full bg-[#5579FF] flex-shrink-0" />
              <div className="flex-grow h-[1px] border-t border-dashed border-[#A7C0FF]" />
              <div className="w-[4px] h-[4px] rounded-full bg-[#5579FF] flex-shrink-0" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
