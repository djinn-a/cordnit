import { notFound } from "next/navigation";
import { getPage } from "@/lib/cms/get-page";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("salesforce/managed-services");
  if (!page?.seo) return {};
  
  return {
    title: page.seo.title,
    description: page.seo.description,
  };
}

export default async function SalesforceManagedServicesPage() {
  const page = await getPage("salesforce/managed-services");
  
  if (!page) {
    notFound();
  }

  return (
    <LayoutRenderer 
      layout={page.layout} 
      sections={page.sections} 
      className="[&>main]:gap-space-56! md:[&>main]:gap-space-80! [&>main]:pb-space-56! md:[&>main]:pb-space-80!"
    />
  );
}
