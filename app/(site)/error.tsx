"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({ error, reset }: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    console.error("[site] render error", error.digest ?? "", error);
  }, [error]);

  return (
    <main className="grow flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl flex flex-col items-center gap-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Error</p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink">This page couldn&apos;t load</h1>
        <p className="text-ink-muted">A temporary problem stopped this page from loading. Please try again.</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="bg-primary hover:bg-primary-hover text-white rounded-btn px-6 py-2.5 font-semibold transition-colors"
          >
            Try again
          </button>
          <Link href="/" className="border border-border-subtle rounded-btn px-6 py-2.5 font-semibold hover:border-primary hover:text-primary transition-colors">
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
