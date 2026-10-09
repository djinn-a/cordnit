import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import type { SectionContentMap } from "@/lib/cms/registry";
import { NewsletterButton } from "../chrome-client";

export default function TopBar({ content }: Readonly<{ content: SectionContentMap["navbar"] }>) {
  const breach = (
    <>
      <AlertTriangle aria-hidden className="w-3.5 h-3.5 mr-1.5" />
      {content.topBarBreachLabel}
    </>
  );
  return (
    <div className="w-full bg-primary text-white py-1.5 px-4 sm:px-6 lg:px-8 z-50 relative">
      <div className="max-w-7xl 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto flex justify-end items-center text-xs font-medium tracking-wide">
        {content.topBarBreachHref ? (
          <Link href={content.topBarBreachHref} className="flex items-center hover:text-white/80 transition-colors">{breach}</Link>
        ) : (
          <span className="flex items-center">{breach}</span>
        )}
        <span aria-hidden className="mx-3 text-white/50">|</span>
        <NewsletterButton label={content.topBarNewsletterLabel} />
      </div>
    </div>
  );
}
