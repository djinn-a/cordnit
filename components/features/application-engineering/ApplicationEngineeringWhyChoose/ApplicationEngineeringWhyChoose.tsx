import { WhyChooseSection } from "@/components/ui/WhyChooseSection";
import type { WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

export type ApplicationEngineeringWhyChooseProps = {
  data: WhyChooseSectionData;
};

export default function ApplicationEngineeringWhyChoose({
  data,
}: ApplicationEngineeringWhyChooseProps) {
  return <WhyChooseSection data={data} />;
}
