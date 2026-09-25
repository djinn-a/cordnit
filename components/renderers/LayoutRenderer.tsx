import { PageLayout } from "@/components/ui";
import SectionRenderer from "./SectionRenderer";
import type { LayoutType, PageSection, PageDocument } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";

type LayoutRendererProps = {
  page?: PageDocument;
  layout?: LayoutType;
  breadcrumbs?: { label: string; href?: string; isCurrent?: boolean }[];
  sections?: PageSection[];
  className?: string;
};

/**
 * Picks a page shell variant, then delegates blocks to SectionRenderer.
 * Root layout still owns TopBar / Navbar / Footer chrome.
 */
export default function LayoutRenderer({
  page,
  layout = page?.layout ?? "default",
  breadcrumbs = page?.breadcrumbs,
  sections = page?.sections ?? [],
  className,
}: Readonly<LayoutRendererProps>) {
  return (
    <PageLayout
      className={cn(layout === "contact" && "[&>main]:pt-[72px]", className)}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <SectionRenderer sections={sections} />
    </PageLayout>
  );
}
