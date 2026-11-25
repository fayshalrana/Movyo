// components/quiz/HardStopScreen.tsx
"use client";
import { AppLink } from "@/components/ui/AppLink";
import { useQuizStore } from "@/lib/store/useIntakeStore";

interface HardStopScreenProps {
  message: string;
}

export function HardStopScreen({ message }: HardStopScreenProps) {
  const { reset, clearHardStop } = useQuizStore();

  return (
    <>
      <section className="w-full border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center py-4">
            <button
              onClick={clearHardStop}
              className="mr-3 text-[#292929] text-2xl hover:text-[#C32E6D] transition-colors"
              title="Review / Change Answer"
            >
              ←
            </button>
          </div>
        </div>
      </section>

      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        {/* Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf2f7]">
          <svg
            className="h-8 w-8 text-[#C32E6D]"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>

        <p className="mt-6 font-sf text-5xl font-semibold tabular-nums tracking-tight text-[#111] md:text-6xl">
          Ineligible
        </p>
        <h1 className="mt-6 font-sf text-2xl font-medium text-[#292929] md:text-3xl">
          We can't proceed at this time
        </h1>
        <p className="mt-3 max-w-md font-sf text-base font-normal leading-relaxed text-[#6B7280]">
          {message}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <button
            onClick={clearHardStop}
            className="inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
          >
            Review & Change Answer
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-8 py-3 font-sf text-sm font-medium text-[#292929] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
          >
            Start over
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
    </>
  );
}
