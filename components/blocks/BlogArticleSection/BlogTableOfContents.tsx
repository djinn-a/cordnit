"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface TocItem {
  id: string;
  label: string;
}

export interface BlogTableOfContentsProps {
  lastUpdatedLabel?: string;
  lastUpdatedDate?: string;
  tocTitle?: string;
  items: TocItem[];
}

export default function BlogTableOfContents({
  lastUpdatedLabel,
  lastUpdatedDate,
  tocTitle,
  items,
}: Readonly<BlogTableOfContentsProps>) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden lg:flex w-80 shrink-0 flex-col justify-start items-start gap-space-16 lg:sticky lg:top-space-32">
      {(lastUpdatedLabel || lastUpdatedDate) && (
        <div className="flex flex-col justify-start items-start gap-space-2">
          {lastUpdatedLabel && (
            <span className="text-ink text-link-desktop font-semibold font-mulish">
              {lastUpdatedLabel}
            </span>
          )}
          {lastUpdatedDate && (
            <time className="text-ink text-help-card-desc-mobile font-normal font-mulish">
              {lastUpdatedDate}
            </time>
          )}
        </div>
      )}

      {items.length > 0 && (
        <nav
          aria-label={tocTitle}
          className="w-full py-space-16 rounded-hero border border-border-card flex flex-col justify-start items-start gap-space-16"
        >
          {tocTitle && (
            <div className="w-full px-space-12 border-b border-border-subtle pb-space-8 flex flex-col justify-start items-start">
              <h2 className="text-ink text-link-desktop font-bold font-mulish">
                {tocTitle}
              </h2>
            </div>
          )}

          <ul className="w-full flex flex-col justify-start items-start m-0 p-0 list-none">
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <li key={item.id} className="w-full">
                  <button
                    type="button"
                    onClick={() => handleSelect(item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "w-full text-left p-space-12 border-l-4 text-help-card-desc-mobile font-normal font-mulish transition-colors cursor-pointer",
                      isActive
                        ? "bg-primary-pale border-primary text-ink"
                        : "border-primary-muted/40 text-ink-muted hover:text-ink hover:bg-primary-pale/40",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </aside>
  );
}
