// components/quiz/fields/CheckboxQuestion.tsx
"use client";

import { DosableQuestion } from "@/lib/intake-form/types";

interface Props {
  question: DosableQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  onSubmit: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function CheckboxQuestion({
  question,
  value,
  onChange,
  onSubmit,
  disabled,
  error,
}: Props) {
  const toggle = (opt: string) => {
    // "None of the above" is mutually exclusive
    if (opt.toLowerCase().includes("none")) {
      onChange([opt]);
      return;
    }
    const without = value.filter((v) => !v.toLowerCase().includes("none"));
    onChange(
      without.includes(opt)
        ? without.filter((v) => v !== opt)
        : [...without, opt],
    );
  };

  return (
    <div>
      <p className="font-sf text-lg font-medium text-[#292929]">
        {question.title}
      </p>
      <div className="mt-4 space-y-3">
        {question.options.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-colors ${
              value.includes(opt.option_text)
                ? "border-[#C32E6D] bg-[#fdf2f7]"
                : "border-[#E5E7EB] hover:border-[#C32E6D]/40"
            }`}
          >
            <input
              type="checkbox"
              checked={value.includes(opt.option_text)}
              onChange={() => toggle(opt.option_text)}
              className="accent-[#C32E6D]"
              disabled={disabled}
            />
            <span className="font-sf text-sm text-[#292929]">
              {opt.option_text}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-3 text-sm text-rose-600 font-sf flex items-center gap-1.5 animate-fade-in font-medium">
          <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </p>
      )}
      <button
        onClick={onSubmit}
        disabled={value.length === 0 || disabled}
        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] disabled:opacity-40"
      >
        {disabled ? "Saving..." : "Continue"}
      </button>
    </div>
  );
}
