import { CredentialsSection, CredentialsSectionData } from "@/components/ui/CredentialsSection";

type AiAutomationCredentialsProps = {
  data: CredentialsSectionData;
};

export default function AiAutomationCredentials({ data }: AiAutomationCredentialsProps) {
  return <CredentialsSection data={data} />;
}
