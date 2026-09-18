import { WhyChooseSection, WhyChooseSectionData } from "@/components/ui/WhyChooseSection";

type SalesforceWhyChooseProps = {
  data: WhyChooseSectionData;
};

export default function SalesforceWhyChoose({ data }: SalesforceWhyChooseProps) {
  return <WhyChooseSection data={data} />;
}
