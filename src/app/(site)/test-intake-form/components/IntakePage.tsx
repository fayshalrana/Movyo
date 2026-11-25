"use client";
import { QuizShell } from "@/app/(site)/test-intake-form/components/quiz/QuizSShell";
import { DosableQuestion } from "@/lib/intake-form/types";
import { useEffect, useRef, useState } from "react";
import {
  getStoredSessionId,
  storeSessionId,
} from "@/lib/intake-form/session";
import { createIntakeSessionAction } from "@/server/actions/intake";

interface IntakePageProps {
  questions: DosableQuestion[];
}

export function IntakePage({ questions }: IntakePageProps) {
  // sessionId arrives as a prop — no fetch needed here
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const hasInitialized = useRef(false); // prevent double-call in StrictMode

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const existing = getStoredSessionId();
    if (existing) {
      setSessionId(existing); // ✅ inside effect callback — allowed
      return;
    }

    createIntakeSessionAction()
      .then((id) => {
        storeSessionId(id);
        setSessionId(id); // ✅ inside async callback — allowed
      })
      .catch((e) => {
        console.error("[IntakePage] Failed to create session:", e);
        setError(true);
      });
  }, []); // ✅ empty deps — runs once after mount

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-sf text-2xl font-medium text-[#292929]">
          Failed to start session
        </p>
        <p className="mt-3 font-sf text-sm text-[#6B7280]">
          Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c]"
        >
          Refresh
        </button>
      </div>
    );
  }

  if (!sessionId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#C32E6D] border-t-transparent" />
      </div>
    );
  }
  console.log("Client sessionId", sessionId);
  return <QuizShell questions={questions} sessionId={sessionId} />;
}
