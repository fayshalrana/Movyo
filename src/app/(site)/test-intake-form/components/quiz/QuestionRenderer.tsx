// components/quiz/QuestionRenderer.tsx
"use client";
import { useEffect, useState, useTransition } from "react";
import { useQuizStore } from "@/lib/store/useIntakeStore";
import { DosableQuestion } from "@/lib/intake-form/types";
import { CheckboxQuestion } from "./CheckboxQuestion";
import { RadioQuestion } from "./RadioQuestion";
import { TextareaQuestion } from "./TextareaQuestion";
import { ConsentQuestion } from "./ConsentQuestion";
import {
  getSavedAnswerAction,
  saveAnswerAction,
} from "@/server/actions/intake";
interface Props {
  question: DosableQuestion;
}

function getDefaultValue(question: DosableQuestion): string | string[] {
  return question.type === "checkbox" ? [] : "";
}

export function QuestionRenderer({ question }: Props) {
  const { answer, answers, sessionId, isBackNavigation } = useQuizStore();
  const [value, setValue] = useState<string | string[] | any | unknown>(
    getDefaultValue(question),
  );
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, startSaving] = useTransition();

  const storedAnswer = answers.find((a) => a.questionId === question.id)?.value;

  // Fetch saved answer on mount (for back navigation)
  useEffect(() => {
    setValidationError(null); // Reset validation errors when question switches
    if (!sessionId || !isBackNavigation) {
      // No session or not back navigation — use store state if available or default
      setValue(storedAnswer ?? getDefaultValue(question));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    getSavedAnswerAction(sessionId, question.id)
      .then((saved) => {
        const savedAnswers = saved as Record<number, { value: string | string[] }>;
        if (savedAnswers?.[question.id]?.value !== undefined) {
          // ✅ API returned a saved answer
          setValue(savedAnswers[question.id].value);
        } else if (storedAnswer !== undefined) {
          // ✅ Fallback to Zustand store
          setValue(storedAnswer);
        } else {
          // ✅ No answer anywhere — use default
          setValue(getDefaultValue(question));
        }
      })
      .catch((e) => {
        console.warn(
          "[QuestionRenderer] Failed to fetch answer, using store fallback:",
          e,
        );
        // ✅ API failed — fall back to store
        setValue(storedAnswer ?? getDefaultValue(question));
      })
      .finally(() => setIsLoading(false));
  }, [question.id, sessionId, isBackNavigation]);

  const validateValue = (val: string): string | null => {
    if (question.type !== "textarea") return null;
    const titleLower = question.title.toLowerCase();
    if (titleLower.includes("height")) {
      const trimmed = val.trim();
      if (!trimmed) return null;
      const heightRegex = /^\d+\s*'\s*\d+\s*"?\s*$/;
      if (!heightRegex.test(trimmed)) {
        return "Height must be in feet'inches\" format (e.g., 5'10\" or 6' 1\").";
      }
    } else if (titleLower.includes("weight")) {
      const trimmed = val.trim();
      if (!trimmed) return null;
      const weightRegex = /^\d+(\.\d+)?$/;
      if (!weightRegex.test(trimmed)) {
        return "Weight must be a numeric value in pounds (e.g., 150 or 180.5).";
      }
    }
    return null;
  };

  const handleAnswer = (val: string | string[]) => {
    setValidationError(null);

    // Local format validation check
    if (typeof val === "string") {
      const localErr = validateValue(val);
      if (localErr) {
        setValidationError(localErr);
        return; // Block progression
      }
    }

    // Cache gender and birthday in localStorage if applicable
    if (typeof window !== "undefined") {
      const titleLower = (question.title || "").toLowerCase();
      const stringVal = String(val).trim();
      
      if (titleLower.includes("sex") || titleLower.includes("gender")) {
        let normGender = "Other";
        if (stringVal.toLowerCase().startsWith("m")) normGender = "Male";
        else if (stringVal.toLowerCase().startsWith("f")) normGender = "Female";
        localStorage.setItem("user-gender", normGender);
        console.log("[QuestionRenderer] Cached user-gender in localStorage:", normGender);
      } else if (titleLower.includes("birthday") || titleLower.includes("birth date")) {
        localStorage.setItem("user-birthday", stringVal);
        console.log("[QuestionRenderer] Cached user-birthday in localStorage:", stringVal);
      }
    }

    startSaving(async () => {
      const { success, message } = await saveAnswerAction(
        sessionId || "",
        question.id,
        val,
        question.title,
      );
      if (!success) {
        console.error("[QuestionRenderer] Save failed:", message);
        setValidationError(message || "Invalid input format. Please check your answer format.");
        return; // Prevent navigating further if there is a validation error
      }
      answer(question.id, val);
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C32E6D] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {question.type === "textarea" && (
        <TextareaQuestion
          question={question}
          value={value as string}
          onChange={(newVal) => {
            setValue(newVal);
            const err = validateValue(newVal);
            setValidationError(err);
          }}
          onSubmit={() => handleAnswer(value as string)}
          disabled={isSaving}
          error={validationError}
        />
      )}
      {question.type === "radio" && (
        <RadioQuestion
          question={question}
          value={value as string}
          onChange={(newVal) => {
            setValue(newVal);
            setValidationError(null);
          }}
          onSubmit={() => handleAnswer(value as string)}
          disabled={isSaving}
          error={validationError}
        />
      )}
      {question.type === "checkbox" && (
        <CheckboxQuestion
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={(newVal) => {
            setValue(newVal);
            setValidationError(null);
          }}
          onSubmit={() => handleAnswer(value as string[])}
          disabled={isSaving}
          error={validationError}
        />
      )}
      {question.type === "consent" && (
        <ConsentQuestion
          question={question}
          value={value as string}
          onChange={(newVal) => {
            setValue(newVal);
            setValidationError(null);
          }}
          onSubmit={() => handleAnswer(value as string)}
          disabled={isSaving}
          error={validationError}
        />
      )}
    </div>
  );
}
