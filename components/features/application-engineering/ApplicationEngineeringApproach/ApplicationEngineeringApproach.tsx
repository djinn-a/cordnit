import { ProcessSection } from "@/components/ui/ProcessSection";
import type { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export type ApplicationEngineeringApproachProps = {
  data: ProcessSectionData;
};

export default function ApplicationEngineeringApproach({
  data,
}: ApplicationEngineeringApproachProps) {
  return <ProcessSection data={data} />;
}
