import ProcessSection, { ProcessSectionData } from "@/components/ui/ProcessSection/ProcessSection";

type SalesforceApproachProps = {
  data: ProcessSectionData;
};

export default function SalesforceApproach({ data }: SalesforceApproachProps) {
  return <ProcessSection data={data} />;
}
