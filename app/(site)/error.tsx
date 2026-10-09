"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function SiteError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    // Keep the support reference for debugging without exposing the server error details.
    console.error("[site] render error", error.digest ?? "");
  }, [error.digest]);

  return (
    <main className="grow flex items-center justify-center px-space-24 py-space-80 text-center">
      <div className="w-full max-w-media-wrap flex flex-col items-center gap-space-24">
        <h1 className="text-cta-title-mobile md:text-split-section-title text-primary">Server Error</h1>
        <Image
          src="/error/error_500.svg"
          alt="An illustration of a server error"
          width={578}
          height={345}
          className="h-auto w-full max-w-media-wrap"
          priority
        />
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
      </div>
    </main>
  );
}
