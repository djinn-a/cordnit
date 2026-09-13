import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";

export const metadata = underDevelopmentMetadata("Industries");

export default function IndustriesPage() {
  return <UnderDevelopmentPage pageLabel="Industries" />;
}
