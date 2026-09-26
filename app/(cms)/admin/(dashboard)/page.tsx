import type { Metadata } from "next";
import { Suspense } from "react";
import PagesTable from "@/components/cms/pages/PagesTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "Pages" };

async function PagesData() {
  await requireSuperAdminPage();
  const [pages, templates] = await Promise.all([cms.pages.listPages({}), cms.templates.listTemplates()]);
  return (
    <PagesTable
      pages={pages.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        liveSlug: p.liveSlug,
        hasUnpublishedChanges: p.hasUnpublishedChanges,
        publishedVersion: p.publishedVersion,
        sectionCount: p.sectionCount,
        lockVersion: p.lockVersion,
        updatedAt: p.updatedAt,
      }))}
      templates={templates.map((t) => ({ id: t.id, label: t.name }))}
    />
  );
}

export default function AdminPagesPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PagesData />
    </Suspense>
  );
}
