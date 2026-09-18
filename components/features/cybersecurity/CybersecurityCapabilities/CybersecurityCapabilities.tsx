import { CardGridSection } from "@/components/ui/CardGridSection";
import type { CardGridSectionData } from "@/components/ui/CardGridSection";

export type CybersecurityCapabilitiesProps = {
  data: CardGridSectionData;
};

export default function CybersecurityCapabilities({ data }: CybersecurityCapabilitiesProps) {
  return <CardGridSection data={data} />;
}
