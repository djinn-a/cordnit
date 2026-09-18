import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("ai-automation");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function AiAutomationPage() {
  const page = await getPage("ai-automation");
  if (!page) notFound();

  return (
    <LayoutRenderer 
      layout={page.layout} 
      sections={page.sections} 
      className="[&>main]:!gap-space-56 md:[&>main]:!gap-space-80 [&>main]:!pb-space-56 md:[&>main]:!pb-space-80"
    />
  );
}
