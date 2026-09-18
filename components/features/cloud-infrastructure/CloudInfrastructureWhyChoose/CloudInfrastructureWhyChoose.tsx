import { WhyChooseSection } from "@/components/ui/WhyChooseSection";
import type { WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

export type CloudInfrastructureWhyChooseProps = {
  data?: WhyChooseSectionData;
};

export default function CloudInfrastructureWhyChoose({
  data,
}: CloudInfrastructureWhyChooseProps) {
  // We can pass data to the generic component or it can use a default inside
  return <WhyChooseSection data={data} />;
}
