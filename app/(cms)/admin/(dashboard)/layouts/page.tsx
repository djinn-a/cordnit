import type { Metadata } from "next";
import { Suspense } from "react";
import TemplatesTable from "@/components/cms/layouts/TemplatesTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { slugToPath } from "@/lib/cms/document";
import { SECTION_CATALOG } from "@/lib/cms/registry/catalog";
import { isSectionType } from "@/lib/cms/types";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "Layouts" };

async function LayoutsData() {
  await requireSuperAdminPage();
  const [templates, pages] = await Promise.all([cms.templates.listTemplates(), cms.pages.listPages({})]);
  return (
    <TemplatesTable
      templates={templates.map((t) => ({
        id: t.id,
        name: t.name,
        key: t.key,
        description: t.description,
        sectionLabels: t.sectionTypes.map((type) => (isSectionType(type) ? SECTION_CATALOG[type].label : type)),
        updatedAt: t.updatedAt,
      }))}
      pages={pages.map((p) => ({ id: p.id, label: `${p.title} (${slugToPath(p.slug)})` }))}
    />
  );
}

export default function LayoutsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LayoutsData />
    </Suspense>
  );
}
