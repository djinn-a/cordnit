import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import AdminShell from "@/components/cms/shell/AdminShell";
import UserMenu from "@/components/cms/shell/UserMenu";
import UserMenuSkeleton from "@/components/cms/shell/UserMenuSkeleton";
import { requireSuperAdminPage } from "@/server/auth";

async function CurrentUser() {
  const session = await requireSuperAdminPage();
  return <UserMenu username={session.username} />;
}

/** antd evaluates Date.now() on import, so the admin shell must never be prerendered. */
async function Shell({ children }: Readonly<{ children: ReactNode }>) {
  await connection();
  return (
    <AdminShell
      userSlot={
        <Suspense fallback={<UserMenuSkeleton />}>
          <CurrentUser />
        </Suspense>
      }
    >
      {children}
    </AdminShell>
  );
}

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Suspense>
      <Shell>{children}</Shell>
    </Suspense>
  );
}
