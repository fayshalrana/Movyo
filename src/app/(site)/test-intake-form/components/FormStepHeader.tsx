"use client";

import React from "react";
import { cn } from "@/lib/helper/utils";

export type Step = {
  id: string;
  label: string;
};

const defaultSteps: Step[] = [
  { id: "start", label: "Start" },
  { id: "preliminary", label: "Preliminary" },
  { id: "health", label: "Health" },
  { id: "details", label: "Details" },
  { id: "eligibility", label: "Eligibility" },
];

type FormStepHeaderProps = {
  activeStepId?: string;
  steps?: Step[];
  onBack?: () => void;
};

export default function FormStepHeader({
  activeStepId = "start",
  steps = defaultSteps,
  onBack,
}: FormStepHeaderProps) {
  const activeIndex = steps.findIndex((s) => s.id === activeStepId);
  const safeActiveIndex = activeIndex >= 0 ? activeIndex : 0;

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <section className="w-full border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center py-4">
          <button
            onClick={handleBack}
            className="mr-3 text-[#292929] text-2xl hover:text-[#C32E6D] transition-colors"
            title="Go back to previous step"
          >
            ←
          </button>
          <div className="flex justify-between w-full">
            {defaultSteps.map(({ label, id }, index: number) => (
              <div key={id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      index <= 1
                        ? "bg-[#C32E6D] text-white"
                        : "bg-[#E5E7EB] text-[#171717]",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-1",
                      index <= 1
                        ? "text-[#C32E6D] font-medium"
                        : "text-[#171717]",
                    )}
                  >
                    {label}
                  </div>
                </div>
                {index < defaultSteps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-16 mx-2",
                      index <= 0 ? "bg-[#C32E6D]" : "bg-[#E5E7EB]",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
