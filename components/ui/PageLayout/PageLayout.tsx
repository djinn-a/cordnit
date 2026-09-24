import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Page shell for main content. Site chrome (TopBar/Navbar/Footer) lives in root layout. */
export default function PageLayout({ children, className }: Readonly<PageLayoutProps>) {
  return (
    <div className={cn("flex flex-col min-h-screen font-sans bg-surface items-center", className)}>
      <main className="grow flex flex-col w-full max-w-container-1440 px-space-16 md:px-space-32 lg:px-space-60 pt-space-24 md:pt-space-80 pb-space-80 gap-space-56 md:gap-space-80 bg-surface">{children}</main>
    </div>
  );
}
