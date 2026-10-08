import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/layout/TopBar/TopBar";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { ContactModalProvider } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { NewsletterModalProvider } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { AttributionCapture } from "@/components/features/leads/AttributionCapture";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { SITE_FOOTER_BLOCK_KEY, SITE_NAVBAR_BLOCK_KEY } from "@/lib/cms/document";
import { getPublishedBlockByKey } from "@/server/cms/queries/published";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_NAME}` },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: "/fev.svg" },
};

export default async function SiteRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [navbar, footer] = await Promise.all([
    getPublishedBlockByKey(SITE_NAVBAR_BLOCK_KEY, "navbar").catch((error: unknown) => {
      console.error("[SiteRootLayout] Failed to load the published navbar Global Block.", error);
      return null;
    }),
    getPublishedBlockByKey(SITE_FOOTER_BLOCK_KEY, "footer").catch((error: unknown) => {
      console.error("[SiteRootLayout] Failed to load the published footer Global Block.", error);
      return null;
    }),
  ]);
  return (
    <html
      lang="en"
      className={`${mulish.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <AttributionCapture />
        <ContactModalProvider>
          <NewsletterModalProvider>
            <TopBar content={navbar?.type === "navbar" ? navbar.props : undefined} />
            <Navbar content={navbar?.type === "navbar" ? navbar.props : undefined} />
            {children}
            <Footer content={footer?.type === "footer" ? footer.props : undefined} />
          </NewsletterModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
