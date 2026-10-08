"use client";

import Link from "next/link";
import { useEffect } from "react";
import "./globals.css";

/**
 * Last-resort boundary for failures in the root layouts, which sit above
 * route-level error boundaries. It supplies its own document shell because
 * Next.js skips the root layout when this boundary is rendered.
 */
export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    // Log only Next.js's support reference; keep internal error details private.
    console.error("[global] render error", error.digest ?? "");
  }, [error.digest]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-surface px-space-24 py-space-80 text-center font-sans antialiased">
        <main className="w-full max-w-media-wrap flex flex-col items-center gap-space-24">
          <p className="text-eyebrow-mobile md:text-eyebrow-desktop uppercase tracking-wider text-primary">500</p>
          <h1 className="text-cta-title-mobile md:text-cta-title-desktop text-ink">Something went wrong</h1>
          <p className="text-section-subtitle-mobile md:text-section-subtitle text-ink-muted">
            We couldn&apos;t load this page right now. Please try again or return to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-space-12">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center rounded-btn bg-primary px-space-24 py-space-12 text-link-desktop text-surface transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-btn border border-border-subtle px-space-24 py-space-12 text-link-desktop text-ink transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
