import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";

export const metadata = underDevelopmentMetadata("Accelerators");

export default function AcceleratorsPage() {
  return <UnderDevelopmentPage pageLabel="Accelerators" />;
}
