import { ProcessSection } from "@/components/ui";
import type { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

export type CloudInfrastructureApproachProps = {
  data: ProcessSectionData;
};

export default function CloudInfrastructureApproach({
  data,
}: CloudInfrastructureApproachProps) {
  return <ProcessSection data={data} />;
}
