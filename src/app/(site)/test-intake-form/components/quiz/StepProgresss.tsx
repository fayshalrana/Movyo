// components/quiz/StepProgress.tsx
import { cn } from "@/lib/helper/utils";

interface Step {
  id: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: string;
  onBack?: () => void;
}

export function StepProgress({
  steps,
  currentStep,
  onBack,
}: StepProgressProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <section className="w-full border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center py-4">
          <button
            onClick={onBack}
            className="mr-3 text-[#292929] text-2xl hover:text-[#C32E6D] transition-colors"
            title="Go back to previous step"
          >
            ←
          </button>
          <div className="flex justify-between w-full">
            {steps.map(({ label, id }, index) => (
              <div key={id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      index <= currentIndex
                        ? "bg-[#C32E6D] text-white"
                        : "bg-[#E5E7EB] text-[#171717]",
                    )}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={cn(
                      "text-xs mt-1",
                      index <= currentIndex
                        ? "text-[#C32E6D] font-medium"
                        : "text-[#171717]",
                    )}
                  >
                    {label}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-16 mx-2",
                      index < currentIndex ? "bg-[#C32E6D]" : "bg-[#E5E7EB]",
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
