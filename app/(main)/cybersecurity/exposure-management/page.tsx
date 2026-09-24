import { notFound } from "next/navigation";
import { getPage } from "@/lib/cms/get-page";
import LayoutRenderer from "@/components/renderers/LayoutRenderer";

export default async function ExposureManagementPage() {
  const pageData = await getPage("exposure-management");

  if (!pageData) {
    notFound();
  }

  return <LayoutRenderer layout={pageData.layout} sections={pageData.sections} />;
}
