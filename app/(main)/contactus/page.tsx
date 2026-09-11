import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("contactus");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function ContactUsPage() {
  const page = await getPage("contactus");
  if (!page) notFound();

  return (
    <LayoutRenderer layout={page.layout} sections={page.sections} />
  );
}
