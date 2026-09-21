import { CredentialsSection } from "@/components/ui";
import type { CredentialsSectionData } from "@/components/ui/CredentialsSection";

export type CybersecurityCredentialsProps = {
  data: CredentialsSectionData;
};

export default function CybersecurityCredentials({
  data,
}: CybersecurityCredentialsProps) {
  return <CredentialsSection data={data} />;
}
