import type { Metadata } from "next";
import { Suspense } from "react";
import RedirectsTable from "@/components/cms/redirects/RedirectsTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "Redirects" };

async function RedirectsData() {
  await requireSuperAdminPage();
  const rows = await cms.redirects.listRedirects();
  return <RedirectsTable redirects={rows.map((r) => ({ fromPath: r.fromPath, toPath: r.toPath, statusCode: r.statusCode }))} />;
}

export default function RedirectsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RedirectsData />
    </Suspense>
  );
}
