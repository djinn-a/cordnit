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
    <div className="flex flex-col gap-[40px] w-full">
      <Container className="pt-[80px] pb-0">
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions", href: "/solutions" },
            { label: "Application Engineering" }
          ]} 
        />
      </Container>
      <LayoutRenderer 
        layout={page.layout} 
        sections={page.sections} 
        className="[&>main]:!pt-0 [&>main]:!gap-space-56 md:[&>main]:!gap-space-80 [&>main]:!pb-space-56 md:[&>main]:!pb-space-80"
      />
    </div>
  );
}
