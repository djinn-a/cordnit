import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import AdminProviders from "@/components/cms/AdminProviders";
import "./admin.css";

const mulish = Mulish({ subsets: ["latin"], variable: "--font-mulish" });

export const metadata: Metadata = {
  title: { default: "Cordinit CMS", template: "%s · Cordinit CMS" },
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/fev.svg" },
};

export const viewport: Viewport = { themeColor: "#0a1122" };

/** The admin is per-request by nature; the antd style registry must not be prerendered. */
async function StyleRegistry({ children }: Readonly<{ children: ReactNode }>) {
  await connection();
  return (
    <AntdRegistry>
      <AdminProviders>{children}</AdminProviders>
    </AntdRegistry>
  );
}

export default function CmsRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={mulish.variable}>
      <body>
        <Suspense>
          <StyleRegistry>{children}</StyleRegistry>
        </Suspense>
      </body>
    </html>
  );
}
