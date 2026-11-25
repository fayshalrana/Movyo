// components/quiz/fields/TextareaQuestion.tsx
"use client";

import { DosableQuestion } from "@/lib/intake-form/types";

interface Props {
  question: DosableQuestion;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function TextareaQuestion({
  question,
  value,
  onChange,
  disabled,
  onSubmit,
  error,
}: Props) {
  return (
    <div>
      <label className="font-sf text-lg font-medium text-[#292929]">
        {question.title}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="mt-4 w-full rounded-xl border border-[#E5E7EB] p-4 font-sf text-sm text-[#292929] outline-none transition-colors focus:border-[#C32E6D] focus:ring-1 focus:ring-[#C32E6D]"
        placeholder="Type your answer here..."
      />
      {error && (
        <p className="mt-2 text-sm text-rose-600 font-sf flex items-center gap-1.5 animate-fade-in font-medium">
          <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      <button
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] disabled:opacity-40"
      >
        {disabled ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
