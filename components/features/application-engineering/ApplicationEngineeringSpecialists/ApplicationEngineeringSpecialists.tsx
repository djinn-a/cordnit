import { SplitActionCardsSection } from "@/components/ui/SplitActionCardsSection";
import type { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export type ApplicationEngineeringSpecialistsProps = {
  data: SplitActionCardsSectionData;
};

export default function ApplicationEngineeringSpecialists({
  data,
}: ApplicationEngineeringSpecialistsProps) {
  return <SplitActionCardsSection data={data} />;
}
