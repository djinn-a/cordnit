"use client";

import { Mail } from "lucide-react";
import type { NewsletterSectionProps } from "./NewsletterSection.types";

export default function NewsletterContent({
  title = "Keep the conversation going.",
  description = "Receive occasional perspectives on the technology topics that matter to you.",
}: Readonly<Pick<NewsletterSectionProps, "title" | "description">>) {
  return (
    <div className="flex items-center gap-4 md:gap-8 w-full md:w-1/2">
      <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 bg-white border border-primary-border shadow-sm rounded-full flex items-center justify-center">
        <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      </div>
      <div className="flex flex-col gap-1 md:gap-2">
        <h3 className="text-[14px] md:text-[24px] font-bold text-ink leading-tight">
          {title}
        </h3>
        <p className="text-[10px] md:text-[16px] text-ink-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
