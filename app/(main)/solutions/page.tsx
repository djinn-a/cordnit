import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";

export const metadata = underDevelopmentMetadata("Solutions");

export default function SolutionsPage() {
  return <UnderDevelopmentPage pageLabel="Solutions" />;
}
