import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InsightItem } from "./insightsData";

export type InsightCardProps = {
  item: InsightItem;
  className?: string;
};

export default function InsightCard({ item, className = "" }: InsightCardProps) {
  const isExternal = item.readMoreUrl.startsWith("http");
  const CardWrapper = isExternal ? "a" : Link;

  return (
    <CardWrapper
      href={item.readMoreUrl}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative h-panel overflow-hidden flex flex-col justify-between  cursor-pointer ${className}`}
    >
      <div className="absolute inset-0 w-full h-full bg-surface-darker">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient overlay for better text legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-ink/10 via-transparent to-ink/60 pointer-events-none" />
      </div>

      <div className="relative z-10 p-4 sm:p-6">
        <span className="inline-block bg-ink text-surface text-caption font-semibold tracking-wider px-3 py-1.5 uppercase rounded-btn">
          {item.tag}
        </span>
      </div>

      <div className="relative z-10 p-5 sm:p-6 bg-ink/40 backdrop-blur-md border-t border-surface/10 mt-auto">
        <div className="flex items-center text-surface/80 text-caption mb-2">
          <span>{item.type}</span>
          <span className="mx-2">•</span>
          <span>{item.date}</span>
        </div>
        <h3 className="text-surface font-medium text-solution-h4 mb-4 line-clamp-3">
          {item.title}
        </h3>
        <div className="flex items-center text-primary text-body-sm font-medium">
          Read more <ArrowRight className="ml-1.5 h-4 w-4 text-primary" />
        </div>

      </div>
    </CardWrapper>
  );
}
