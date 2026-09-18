import { SplitContentSection } from "@/components/ui/SplitContentSection";
import type { SplitContentSectionData } from "@/components/ui/SplitContentSection";

export type ApplicationEngineeringSplitContentProps = {
  data: SplitContentSectionData;
};

export default function ApplicationEngineeringSplitContent({
  data,
}: ApplicationEngineeringSplitContentProps) {
  return <SplitContentSection data={data} />;
}
