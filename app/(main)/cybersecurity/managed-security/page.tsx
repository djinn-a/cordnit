import { notFound } from "next/navigation";
import { getPage } from "@/lib/cms/get-page";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";

export default async function ManagedSecurityPage() {
  const pageData = await getPage("managed-security");

  if (!pageData) {
    notFound();
  }

  return <LayoutRenderer layout={pageData.layout} sections={pageData.sections} />;
}
