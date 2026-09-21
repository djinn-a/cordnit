import { CardGridSection, CardGridSectionData } from "@/components/ui/CardGridSection";

type SalesforceCapabilitiesProps = {
  data: CardGridSectionData;
};

export default function SalesforceCapabilities({ data }: SalesforceCapabilitiesProps) {
  return <CardGridSection data={data} />;
}
