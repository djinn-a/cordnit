import { CredentialsSection } from "@/components/ui/CredentialsSection";
import type { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export type ApplicationEngineeringCredentialsProps = {
  data: CredentialsSectionData;
};

export default function ApplicationEngineeringCredentials({
  data,
}: ApplicationEngineeringCredentialsProps) {
  return <CredentialsSection data={data} />;
}
