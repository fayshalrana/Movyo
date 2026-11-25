// app/error.tsx
"use client";
import { useEffect } from "react";
import { AppLink } from "@/components/ui/AppLink";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to your error reporting service (Sentry, Datadog, etc.)
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-sf text-5xl font-semibold tabular-nums tracking-tight text-[#111] md:text-6xl">
        500
      </p>
      <h1 className="mt-6 font-sf text-2xl font-medium text-[#292929] md:text-3xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md font-sf text-base font-normal leading-relaxed text-[#6B7280]">
        An unexpected error occurred. Our team has been notified.
        {error.digest && (
          <span className="mt-1 block font-sf text-xs text-[#9CA3AF]">
            Error ID: {error.digest}
          </span>
        )}
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
        >
          Try again
        </button>
        <AppLink
          href="/"
          target="_self"
          className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-8 py-3 font-sf text-sm font-medium text-[#292929] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
        >
          Back to home
        </AppLink>
      </div>
    </div>
  );
}
