import { CredentialsSection } from "@/components/ui";
import type { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export type CloudInfrastructureCredentialsProps = {
  data: CredentialsSectionData;
};

export default function CloudInfrastructureCredentials({
  data,
}: CloudInfrastructureCredentialsProps) {
  return <CredentialsSection data={data} />;
}
