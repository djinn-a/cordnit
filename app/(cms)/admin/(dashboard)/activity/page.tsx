import type { Metadata } from "next";
import { Suspense } from "react";
import ActivityTable from "@/components/cms/activity/ActivityTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "Activity" };

const PAGE_SIZE = 50;
type SearchParams = Promise<{ page?: string | string[] }>;

async function ActivityData({ searchParams }: { searchParams: SearchParams }) {
  await requireSuperAdminPage();
  const raw = (await searchParams).page;
  const page = Math.max(1, Number.parseInt(Array.isArray(raw) ? (raw[0] ?? "1") : (raw ?? "1"), 10) || 1);
  const { rows, total } = await cms.audit.list(page, PAGE_SIZE);
  return (
    <ActivityTable
      rows={rows.map((r) => ({ id: Number(r.id), action: r.action, entityType: r.entityType, summary: r.summary, createdAt: r.createdAt }))}
      total={total}
      page={page}
      pageSize={PAGE_SIZE}
    />
  );
}

export default function ActivityPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ActivityData searchParams={searchParams} />
    </Suspense>
  );
}
