import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("industries");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function IndustriesPage() {
  const page = await getPage("industries");
  if (!page) notFound();

  return (
    <LayoutRenderer layout={page.layout} sections={page.sections} />
  );
}
