import AiAutomationWhereWeHelp from "@/components/features/ai-automation/AiAutomationWhereWeHelp/AiAutomationWhereWeHelp";
import type { AiAutomationWhereWeHelpData } from "@/components/features/ai-automation/data";

export type CloudInfrastructureWhereWeHelpProps = {
  data: AiAutomationWhereWeHelpData;
};

export default function CloudInfrastructureWhereWeHelp({
  data,
}: CloudInfrastructureWhereWeHelpProps) {
  return <AiAutomationWhereWeHelp data={data} />;
}
