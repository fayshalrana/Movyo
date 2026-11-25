// components/quiz/QuizShell.tsx
"use client";
import { useEffect } from "react";
import { DosableQuestion } from "@/lib/intake-form/types";
import { useQuizStore } from "@/lib/store/useIntakeStore";
import { QuestionRenderer } from "./QuestionRenderer";
import { StepProgress } from "./StepProgresss";
import { HardStopScreen } from "./HardStopScreen";
import { CompleteScreen } from "./CompleteScreen";

const STEPS = [
  { id: "preliminary", label: "Preliminary" },
  { id: "health", label: "Health" },
  { id: "details", label: "Details" },
  { id: "eligibility", label: "Eligibility" },
] as const;

interface QuizShellProps {
  questions: DosableQuestion[];
  sessionId: string;
}

export function QuizShell({ questions, sessionId }: QuizShellProps) {
  const {
    init,
    currentQuestionId,
    currentStep,
    isComplete,
    hardStop,
    questions: qMap,
    back,
    questionHistory,
  } = useQuizStore();

  useEffect(() => {
    const firstQuestionId = Array.isArray(questions) && questions.length > 0
      ? Math.min(...questions.map((q) => q.id))
      : 2900000;
    init(questions, firstQuestionId, sessionId);
  }, [questions, sessionId, init]);

  useEffect(() => {
    if (isComplete) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("restoresession", sessionId);
      window.location.href = `/complete?${searchParams.toString()}`;
    }
  }, [isComplete, sessionId]);

  // Scroll to the top when navigating to a new question or state (e.g. hardstop)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestionId, hardStop]);

  const currentQuestion = currentQuestionId ? qMap.get(currentQuestionId) : null;

  if (hardStop) return <HardStopScreen message={hardStop.message} />;

  if (isComplete) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C32E6D] border-t-transparent" />
        <p className="mt-4 font-sf text-base font-medium text-gray-600">Redirecting to complete details...</p>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <StepProgress
        steps={STEPS as any}
        currentStep={currentStep}
        onBack={questionHistory.length > 1 ? back : undefined}
      />

      <div className="mt-10">
        <QuestionRenderer question={currentQuestion} key={currentQuestion.id} />
      </div>

      {questionHistory.length > 1 && (
        <button
          onClick={back}
          className="mt-6 font-sf text-sm text-[#6B7280] underline-offset-2 hover:underline"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
