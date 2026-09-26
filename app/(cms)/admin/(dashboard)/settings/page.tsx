import type { Metadata } from "next";
import { Suspense } from "react";
import SettingsView from "@/components/cms/settings/SettingsView";
import PageSkeleton from "@/components/cms/shared/PageSkeleton";
import { requireSuperAdminPage } from "@/server/auth";

export const metadata: Metadata = { title: "Settings" };

async function SettingsData() {
  const session = await requireSuperAdminPage();
  return <SettingsView username={session.username} />;
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SettingsData />
    </Suspense>
  );
}
