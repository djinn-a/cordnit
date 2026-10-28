import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { getImageUrl } from "@/lib/getImageUrl";
import { isExternalHref } from "@/lib/cms/site-chrome";
import type { BlogMediaCalloutData } from "./BlogArticleSection.types";

export interface BlogInlineMediaCalloutProps {
  callout: BlogMediaCalloutData;
}

export default function BlogInlineMediaCallout({
  callout,
}: Readonly<BlogInlineMediaCalloutProps>) {
  const external = callout.ctaHref ? isExternalHref(callout.ctaHref) : false;

  const thumbnailContent = callout.thumbnail?.url ? (
    <div className="w-full md:w-80 h-48 relative bg-surface rounded-hero overflow-hidden shrink-0 group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getImageUrl(callout.thumbnail.url)}
        alt={callout.thumbnail.alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="inset-0 absolute bg-ink/30 flex justify-center items-center transition-colors group-hover:bg-ink/40">
        <div className="size-6 md:size-8 bg-surface rounded-card-xs md:rounded-btn shadow-help-card flex justify-center items-center">
          <Play
            className="size-3 md:size-3.5 text-primary ml-space-2"
            fill="currentColor"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="w-full p-space-16 md:p-space-32 relative bg-gradient-contact-soft rounded-card border border-border-card flex flex-col md:flex-row justify-start items-start md:items-center gap-space-16 md:gap-space-32">
      {thumbnailContent &&
        (callout.ctaHref ? (
          <Link
            href={callout.ctaHref}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            aria-label={callout.ctaText || callout.title}
            className="w-full md:w-auto shrink-0"
          >
            {thumbnailContent}
          </Link>
        ) : (
          thumbnailContent
        ))}

      <div className="w-full md:flex-1 flex flex-col justify-center items-start gap-space-8 md:gap-space-12">
        <h3 className="text-ink text-card-title-mobile md:text-help-card-title-desktop font-extrabold md:font-bold font-mulish leading-space-28! md:leading-space-32!">
          {callout.title}
        </h3>
        <p className="text-ink-muted text-card-desc font-normal font-mulish">
          {callout.description}
        </p>

        {callout.ctaText && callout.ctaHref && (
          <div className="pt-space-8 flex flex-col justify-start items-start">
            <Link
              href={callout.ctaHref}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="inline-flex justify-start items-center gap-space-12 text-primary hover:text-primary-hover text-link-mobile font-semibold font-mulish uppercase transition-colors group"
            >
              <span>{callout.ctaText}</span>
              <ArrowRight
                className="size-4 text-primary transition-transform group-hover:translate-x-space-2"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
