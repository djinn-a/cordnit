import { SplitContentSection, SplitContentSectionData } from "@/components/ui/SplitContentSection";

type CybersecuritySplitContentProps = {
  data: SplitContentSectionData;
};

export default function CybersecuritySplitContent({ data }: CybersecuritySplitContentProps) {
  return <SplitContentSection data={data} />;
}
