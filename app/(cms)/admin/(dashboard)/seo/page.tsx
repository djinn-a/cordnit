import type { Metadata } from "next";
import { Suspense } from "react";
import SiteSeoView from "@/components/cms/seo/SiteSeoView";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";
import { cms } from "@/server/cms";

export const metadata: Metadata = { title: "SEO" };

async function SeoData() {
  await requireSuperAdminPage();
  const { seo, lockVersion } = await cms.siteSettings.getSiteSettingsForEdit();
  return <SiteSeoView initial={seo} lockVersion={lockVersion} />;
}

export default function SeoPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SeoData />
    </Suspense>
  );
}
