import { ProcessSection } from "@/components/ui";
import type { ProcessSectionData } from "@/components/ui/ProcessSection";

export type CybersecurityApproachProps = {
  data: ProcessSectionData;
};

export default function CybersecurityApproach({
  data,
}: CybersecurityApproachProps) {
  return <ProcessSection data={data} />;
}
