"use client";

import Link from "next/link";
import Image from "next/image";
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
          <h1 className="text-cta-title-mobile md:text-split-section-title text-primary">Server Error</h1>
          <Image
            src="/error/error_500.svg"
            alt="An illustration of a server error"
            width={578}
            height={135}
            className="h-auto w-full max-w-media-wrap"
            priority
          />
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
