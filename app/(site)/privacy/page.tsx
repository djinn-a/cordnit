import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";

export const metadata = underDevelopmentMetadata("Privacy");

export default function PrivacyPage() {
  return <UnderDevelopmentPage pageLabel="Privacy" />;
}
