import { CredentialsSection, CredentialsSectionData } from "@/components/ui/CredentialsSection";

type SalesforceCredentialsProps = {
  data: CredentialsSectionData;
};

export default function SalesforceCredentials({ data }: SalesforceCredentialsProps) {
  return <CredentialsSection data={data} />;
}
