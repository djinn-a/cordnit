import type { Metadata } from "next";
import { Suspense } from "react";
import type { LeadView } from "@/components/cms/leads/lead-view";
import LeadsTable from "@/components/cms/leads/LeadsTable";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";
import { leadFiltersSchema } from "@/server/cms/services/leads.service";

export const metadata: Metadata = { title: "Leads" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

async function LeadsData({ searchParams }: { searchParams: SearchParams }) {
  await requireSuperAdminPage();
  const raw = await searchParams;
  const filters = leadFiltersSchema.parse({
    type: first(raw.type),
    q: first(raw.q) || undefined,
    from: first(raw.from),
    to: first(raw.to),
    page: first(raw.page),
    pageSize: first(raw.pageSize),
  });
  const { rows, total, countsByType } = await cms.leads.listLeads(filters);

  const leads: LeadView[] = rows.map((r) => ({
    id: r.id,
    type: r.type,
    email: r.email,
    firstName: r.firstName,
    lastName: r.lastName,
    company: r.company,
    jobTitle: r.jobTitle,
    phone: r.phone,
    message: r.message,
    interests: r.interests,
    introCall: r.introCall,
    privacyConsent: r.privacyConsent,
    bookingAt: r.bookingAt,
    attribution: r.attribution,
    userAgent: r.userAgent,
    createdAt: r.createdAt.toISOString(),
  }));

  return <LeadsTable leads={leads} total={total} countsByType={countsByType} filters={filters} />;
}

export default function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LeadsData searchParams={searchParams} />
    </Suspense>
  );
}
