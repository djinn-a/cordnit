import { PageLayout } from "@/components/ui";
import SectionRenderer from "./SectionRenderer";
import type { LayoutType, PageSection } from "@/lib/cms/types";
import { cn } from "@/lib/utils/cn";

type LayoutRendererProps = {
  layout?: LayoutType;
  sections: PageSection[];
  className?: string;
};

/**
 * Picks a page shell variant, then delegates blocks to SectionRenderer.
 * Root layout still owns TopBar / Navbar / Footer chrome.
 */
export default function LayoutRenderer({
  layout = "default",
  sections,
  className,
}: LayoutRendererProps) {
  return (
    <PageLayout
      className={cn(layout === "contact" && "[&>main]:pt-[72px]", className)}
    >
      <SectionRenderer sections={sections} />
    </PageLayout>
  );
}
