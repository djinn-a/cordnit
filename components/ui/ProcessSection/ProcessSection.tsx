import ProcessSectionHeader from "./ProcessSectionHeader";
import ProcessSteps from "./ProcessSteps";
import type { ProcessStepItem } from "./ProcessStepCard";

export type ProcessSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStepItem[];
};

export type ProcessSectionProps = {
  data: ProcessSectionData;
};

export default function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <section className="w-full bg-surface">
      <div className="mx-auto w-full max-w-[1240px]">
        <ProcessSectionHeader
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />
        <ProcessSteps steps={data.steps} />
      </div>
    </section>
  );
}
