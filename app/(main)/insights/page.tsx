import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";

export const metadata = underDevelopmentMetadata("Insights");

export default function InsightsPage() {
  return <UnderDevelopmentPage pageLabel="Insights" />;
}
