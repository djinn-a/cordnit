import { PageLayout } from "@/components/ui";
import { Breadcrumb } from "@/components/ui/Breadcrumb/Breadcrumb";
import type {
  BreadcrumbItem,
  InlineSectionNode,
  PageShell,
  PageSpacing,
} from "@/lib/cms/document";
import { cn } from "@/lib/utils/cn";
import SectionRenderer from "./SectionRenderer";

const COMPACT =
  "[&>main]:gap-space-56! md:[&>main]:gap-space-80! [&>main]:pb-space-56! md:[&>main]:pb-space-80!";

const SPACING_CLASSES: Record<PageSpacing, string | undefined> = {
  default: undefined,
  compact: COMPACT,
  "compact-top": `${COMPACT} [&>main]:pt-6! md:[&>main]:pt-space-80!`,
};

type LayoutRendererProps = {
  shell?: PageShell;
  spacing?: PageSpacing;
  breadcrumbs?: readonly BreadcrumbItem[];
  sections: readonly InlineSectionNode[];
  className?: string;
};

/** Page shell + ordered sections. Root layout still owns TopBar / Navbar / Footer. */
export default function LayoutRenderer({
  shell = "default",
  spacing = "default",
  breadcrumbs,
  sections,
  className,
}: Readonly<LayoutRendererProps>) {
  return (
    <PageLayout
      className={cn(shell === "contact" && "[&>main]:pt-[72px]", SPACING_CLASSES[spacing], className)}
    >
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={[...breadcrumbs]} />}
      <SectionRenderer sections={sections} />
    </PageLayout>
  );
}
