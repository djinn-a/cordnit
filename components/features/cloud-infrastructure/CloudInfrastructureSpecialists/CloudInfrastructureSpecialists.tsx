import { SplitActionCardsSection } from "@/components/ui";
import type { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export type CloudInfrastructureSpecialistsProps = {
  data: SplitActionCardsSectionData;
};

export default function CloudInfrastructureSpecialists({
  data,
}: CloudInfrastructureSpecialistsProps) {
  return <SplitActionCardsSection data={data} />;
}
