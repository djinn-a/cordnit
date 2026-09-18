import AiAutomationWhereWeHelp from "@/components/features/ai-automation/AiAutomationWhereWeHelp/AiAutomationWhereWeHelp";
import type { AiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export type ApplicationEngineeringWhereWeHelpProps = {
  data: AiAutomationWhereWeHelpData;
};

export default function ApplicationEngineeringWhereWeHelp({
  data,
}: ApplicationEngineeringWhereWeHelpProps) {
  return <AiAutomationWhereWeHelp data={data} />;
}
