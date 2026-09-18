import { SplitContentSection, SplitContentSectionData } from "@/components/ui/SplitContentSection";

type CloudInfrastructureSplitContentProps = {
  data: SplitContentSectionData;
};

export default function CloudInfrastructureSplitContent({ data }: CloudInfrastructureSplitContentProps) {
  return <SplitContentSection data={data} />;
}
