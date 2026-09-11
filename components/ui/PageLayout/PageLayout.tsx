import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type PageLayoutProps = {
  children: ReactNode;
  className?: string;
};

/** Page shell for main content. Site chrome (TopBar/Navbar/Footer) lives in root layout. */
export default function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={cn("flex flex-col min-h-screen font-sans bg-surface", className)}>
      <main className="flex-grow flex flex-col w-full bg-surface">{children}</main>
    </div>
  );
}
