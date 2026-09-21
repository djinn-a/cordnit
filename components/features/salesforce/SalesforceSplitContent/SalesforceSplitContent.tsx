import { SplitContentSection, SplitContentSectionData } from "@/components/ui/SplitContentSection";

type SalesforceSplitContentProps = {
  data: SplitContentSectionData;
};

export default function SalesforceSplitContent({ data }: SalesforceSplitContentProps) {
  return <SplitContentSection data={data} />;
}
