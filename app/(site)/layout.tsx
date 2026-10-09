import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/layout/TopBar/TopBar";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { ContactModalProvider } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { NewsletterModalProvider } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { AttributionCapture } from "@/components/features/leads/AttributionCapture";
import { buildSiteMetadata } from "@/lib/seo/page-metadata";
import { SITE_URL } from "@/lib/seo/site";
import { cms } from "@/server/cms";
import { getSiteChrome } from "@/server/cms/queries/site-chrome";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await cms.published.getSiteSeo();
  return {
    metadataBase: new URL(SITE_URL),
    ...buildSiteMetadata(site),
    icons: { icon: "/fev.svg" },
  };
}

export default async function SiteRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { navbar, footer } = await getSiteChrome();
  return (
    <html
      lang="en"
      className={`${mulish.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <AttributionCapture />
        <ContactModalProvider>
          <NewsletterModalProvider>
            <TopBar content={navbar} />
            <Navbar content={navbar} />
            {children}
            <Footer content={footer} />
          </NewsletterModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
