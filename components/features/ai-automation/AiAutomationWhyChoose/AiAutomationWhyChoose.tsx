import { WhyChooseSection, WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

type AiAutomationWhyChooseProps = {
  data: WhyChooseSectionData;
};

export default function AiAutomationWhyChoose({ data }: AiAutomationWhyChooseProps) {
  return <WhyChooseSection data={data} />;
}
