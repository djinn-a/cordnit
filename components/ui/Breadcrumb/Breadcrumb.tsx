import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { BreadcrumbProps } from "./breadcrumb.types";

export function Breadcrumb({ items, className }: Readonly<BreadcrumbProps>) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full pb-0 pt-0 md:pt-0 md:-mb-[40px]", className)}>
      <ol className="flex items-center flex-wrap gap-2 sm:gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.isCurrent || isLast;
          
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2 sm:gap-3">
              {item.href && !isCurrent ? (
                <Link
                  href={item.href}
                  className="text-black text-[14px] leading-space-22 lg:text-link-desktop font-mulish font-normal"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className="text-[#2251FF] font-semibold text-[14px] leading-space-22 lg:text-link-desktop font-mulish"
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight
                  className="w-3 h-3 lg:w-4 lg:h-4 text-black shrink-0"
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
