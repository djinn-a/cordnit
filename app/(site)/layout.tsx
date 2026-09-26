import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/layout/TopBar/TopBar";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { ContactModalProvider } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { NewsletterModalProvider } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { CtaSection } from "@/components/layout/CtaSection";
import { ctaData } from "@/data/cta";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo/site";

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

export default function SiteRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} font-sans h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <ContactModalProvider>
          <NewsletterModalProvider>
            <TopBar />
            <Navbar />
            {children}
            <CtaSection {...ctaData} />
            <Footer />
          </NewsletterModalProvider>
        </ContactModalProvider>
      </body>
    </html>
  );
}
