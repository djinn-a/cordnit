import { SplitActionCardsSection, SplitActionCardsSectionData } from "@/components/ui/SplitActionCardsSection";

type SalesforceSpecialistsProps = {
  data: SplitActionCardsSectionData;
};

export default function SalesforceSpecialists({ data }: SalesforceSpecialistsProps) {
  return <SplitActionCardsSection data={data} />;
}
