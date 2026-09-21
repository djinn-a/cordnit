import { SplitContentSection, SplitContentSectionData } from "@/components/ui/SplitContentSection";

type AiAutomationSplitContentProps = {
  data: SplitContentSectionData;
};

export default function AiAutomationSplitContent({ data }: AiAutomationSplitContentProps) {
  return <SplitContentSection data={data} />;
}
