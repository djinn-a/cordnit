import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";
import { getPage } from "@/lib/cms/get-page";
import CtaSection from "@/components/features/home/CtaSection/CtaSection";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("aboutus");
  return {
    title: page?.seo?.title,
    description: page?.seo?.description,
  };
}

export default async function AboutUsPage() {
  const page = await getPage("aboutus");
  if (!page) notFound();

  return (
    <>
      <LayoutRenderer layout={page.layout} sections={page.sections} />
      <CtaSection />
    </>
  );
}

