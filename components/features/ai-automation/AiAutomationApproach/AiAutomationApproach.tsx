import { ProcessSection } from "@/components/ui";
import type { ProcessSectionData } from "@/components/ui/ProcessSection";

export type AiAutomationApproachProps = {
  data: ProcessSectionData;
};

export default function AiAutomationApproach({
  data,
}: AiAutomationApproachProps) {
  return <ProcessSection data={data} />;
}
