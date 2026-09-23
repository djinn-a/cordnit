import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BreadcrumbProps } from "./breadcrumb.types";

export function Breadcrumb({ items, className }: Readonly<BreadcrumbProps>) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full pt-[24px] pb-0 lg:pt-6 md:-mb-space-40", className)}>
      <ol className="flex items-center flex-wrap gap-2 sm:gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || (isLast && !item.href);
          
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2 sm:gap-3">
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="text-ink-muted hover:text-primary transition-colors text-link-mobile lg:text-link-desktop"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "text-link-mobile lg:text-link-desktop",
                    isCurrent ? "text-primary" : "text-ink-muted"
                  )}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight
                  className="w-3 h-3 lg:w-4 lg:h-4 text-ink-subtle flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
