import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";
import NewsletterSection from "@/components/ui/NewsletterSection/NewsletterSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("insights");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function InsightsPage() {
  const page = await getPage("insights");
  if (!page) notFound();

  return (
    <>
      <LayoutRenderer layout={page.layout} sections={page.sections} />
      <NewsletterSection />
    </>
  );
}
