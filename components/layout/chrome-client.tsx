"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui";
import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { useNewsletterModal } from "@/components/features/newsletter/NewsletterModal/NewsletterModalProvider";
import { trackNavigationEvent } from "@/lib/analytics/navigation";

/** Small client islands shared by the server-rendered TopBar, Navbar and Footer. */

export function trackLinkClick(event: React.MouseEvent, section: string) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest<HTMLAnchorElement>("a[href]");
  if (link) trackNavigationEvent(link.href, link.getAttribute("aria-label") || link.innerText.trim() || link.href, section);
}

/** Wraps server-rendered markup and reports link clicks for analytics. */
export function TrackedRegion({
  as: Tag = "div",
  section,
  className,
  children,
}: Readonly<{ as?: "div" | "footer"; section: string; className?: string; children: ReactNode }>) {
  return (
    <Tag className={className} onClickCapture={(e) => trackLinkClick(e, section)}>
      {children}
    </Tag>
  );
}

export function ContactButton({
  label,
  ctaLocation,
  className,
  size,
}: Readonly<{ label: string; ctaLocation: string; className?: string; size?: "md" }>) {
  const { openModal } = useContactModal();
  return (
    <Button
      variant="primary"
      size={size}
      data-close-menu
      onClick={() => openModal({ ctaLocation })}
      className={className}
      rightIcon={<ArrowRight className="h-4 w-4" />}
    >
      {label}
    </Button>
  );
}

export function NewsletterButton({ label }: Readonly<{ label: string }>) {
  const { openModal } = useNewsletterModal();
  return (
    <button
      type="button"
      onClick={openModal}
      className="hover:text-white/80 transition-colors bg-transparent border-none p-0 cursor-pointer text-xs font-medium tracking-wide text-white"
    >
      {label}
    </button>
  );
}
