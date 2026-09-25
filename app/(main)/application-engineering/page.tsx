import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import Container from "@/components/ui/Container/Container";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("application-engineering");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function ApplicationEngineeringPage() {
  const page = await getPage("application-engineering");
  if (!page) notFound();

  return (
    <LayoutRenderer page={page} />
  );
}
