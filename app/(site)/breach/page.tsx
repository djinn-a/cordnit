import type { Metadata } from "next";
import UnderDevelopmentPage from "@/components/features/under-development/UnderDevelopmentPage";
import { underDevelopmentMetadata } from "@/lib/seo/under-development-metadata";
import { cms } from "@/server/cms";

export async function generateMetadata(): Promise<Metadata> {
  return underDevelopmentMetadata("Breach", (await cms.published.getSiteSeo()).siteName);
}

export default function BreachPage() {
  return <UnderDevelopmentPage pageLabel="Breach" />;
}
