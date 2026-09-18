import { SplitActionCardsSection } from "@/components/ui";
import type { SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

export type CybersecuritySpecialistsProps = {
  data: SplitActionCardsSectionData;
};

export default function CybersecuritySpecialists({ data }: CybersecuritySpecialistsProps) {
  return <SplitActionCardsSection data={data} />;
}
