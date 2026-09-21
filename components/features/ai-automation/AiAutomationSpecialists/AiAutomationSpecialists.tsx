import { SplitActionCardsSection, SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

type AiAutomationSpecialistsProps = {
  data: SplitActionCardsSectionData;
};

export default function AiAutomationSpecialists({ data }: AiAutomationSpecialistsProps) {
  return <SplitActionCardsSection data={data} />;
}
