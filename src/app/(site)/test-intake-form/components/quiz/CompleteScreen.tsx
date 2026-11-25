// components/quiz/CompleteScreen.tsx
"use client";
import { useEffect, useState } from "react";
import { AppLink } from "@/components/ui/AppLink";
import { useQuizStore } from "@/lib/store/useIntakeStore";
import { completeSessionAction } from "@/server/actions/intake";
import { cn } from "@/lib/helper/utils";

export function CompleteScreen() {
  const { answers, sessionId, reset, questions } = useQuizStore();
  const [checkoutUrl, setCheckoutUrl] = useState<string>("/complete");
  const [error, setError] = useState<string | null>(null);
  const [completing, setCompleting] = useState<boolean>(true);

  useEffect(() => {
    console.log("=== FINAL INTAKE FORM SUBMISSION ===");
    console.log("Session ID:", sessionId);
    console.log("Answers:", answers);
    console.log("====================================");

    if (!sessionId) {
      setCompleting(false);
      return;
    }

    setCompleting(true);
    setError(null);

    // Compile final_answers structure for API completion
    const finalAnswers: Record<string, { value: string | string[]; question: string }> = {};
    answers.forEach((ans) => {
      const q = questions.get(ans.questionId);
      if (q) {
        finalAnswers[String(ans.questionId)] = {
          value: ans.value,
          question: q.title || "",
        };
      } else {
        console.warn(`[CompleteScreen] Skipping answer for question ID ${ans.questionId} as it is not in the questions list for this tenant.`);
      }
    });

    // Parse URLSearchParams for tracking utm_*, meds, and coupons
    const searchParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    const meds: string[] = [];
    let couponCode = "";

    searchParams.forEach((val, key) => {
      if (key.startsWith("utm_")) {
        utmParams[key] = val;
      } else if (key === "couponCode" || key === "coupon") {
        couponCode = val;
      } else if (key === "med") {
        meds.push(val);
      }
    });

    const urlMeds = searchParams.getAll("med");
    const uniqueMeds = Array.from(new Set([...meds, ...urlMeds]));

    console.log("[CompleteScreen] Completing intake session via API:", {
      sessionId,
      finalAnswers,
      uniqueMeds,
      couponCode,
      utmParams,
    });

    completeSessionAction(finalAnswers, uniqueMeds, couponCode, utmParams, { sessionId: sessionId || undefined })
      .then((res) => {
        console.log("[CompleteScreen] Complete response:", res);
        const url = res.checkout_url || res.data?.checkout_url;
        if ((res.completed || res.success) && url) {
          // Point link to the returned checkout URL (with tracking/session restored!)
          // If the returned URL is absolute (remote), we can use it, or if it points locally
          try {
            const urlObj = new URL(url, window.location.origin);
            if (urlObj.origin === window.location.origin) {
              setCheckoutUrl(urlObj.pathname + urlObj.search);
            } else {
              setCheckoutUrl(url);
            }
          } catch {
            setCheckoutUrl(url);
          }
        } else {
          setError(res.message || "Server Error");
        }
      })
      .catch((err) => {
        console.error("[CompleteScreen] Failed to complete session via API:", err);
        setError(err.message || String(err));
      })
      .finally(() => {
        setCompleting(false);
      });
  }, [sessionId, answers, questions]);

  return (
    <>
      <section className="w-full border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center py-4">
            <button
              onClick={reset}
              className="mr-3 text-[#292929] text-2xl hover:text-[#C32E6D] transition-colors"
              title="Start over"
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
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <p className="mt-6 font-sf text-5xl font-semibold tabular-nums tracking-tight text-[#111] md:text-6xl">
          Done
        </p>
        <h1 className="mt-6 font-sf text-2xl font-medium text-[#292929] md:text-3xl">
          Your intake form is complete
        </h1>
        <p className="mt-3 max-w-md font-sf text-base font-normal leading-relaxed text-[#6B7280]">
          Thank you for completing the questionnaire. A member of our medical
          team will review your responses and follow up with you shortly.
        </p>

        {/* What happens next */}
        <div className="mt-10 w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6 text-left">
          <h2 className="font-sf text-sm font-semibold text-[#111]">
            What happens next
          </h2>
          <ul className="mt-4 space-y-4">
            {[
              {
                step: "1",
                title: "Medical review",
                description:
                  "A licensed provider will review your intake responses within 1–2 business days.",
              },
              {
                step: "2",
                title: "Treatment plan",
                description:
                  "If approved, your personalized treatment plan and prescription will be sent to you.",
              },
              {
                step: "3",
                title: "Follow-up",
                description:
                  "You'll receive a follow-up to check on your progress and adjust as needed.",
              },
            ].map(({ step, title, description }) => (
              <li key={step} className="flex items-start gap-4">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C32E6D] font-sf text-xs font-medium text-white">
                  {step}
                </div>
                <div>
                  <p className="font-sf text-sm font-medium text-[#292929]">
                    {title}
                  </p>
                  <p className="mt-0.5 font-sf text-xs leading-relaxed text-[#6B7280]">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="mt-6 w-full max-w-md p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium rounded-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-300 text-left">
            <svg className="w-5 h-5 shrink-0 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold text-rose-800">Submission Failed</p>
              <p className="text-xs text-rose-600 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <AppLink
            href={error ? "#" : checkoutUrl}
            target="_self"
            className={cn(
              "inline-flex items-center justify-center rounded-full bg-[#C32E6D] px-8 py-3 font-sf text-sm font-medium text-white transition-colors hover:bg-[#a8275c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2",
              (completing || error) && "opacity-50 pointer-events-none"
            )}
          >
            {completing ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Finalizing session...
              </span>
            ) : "Proceed to checkout"}
          </AppLink>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-8 py-3 font-sf text-sm font-medium text-[#292929] transition-colors hover:bg-[#F9FAFB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C32E6D] focus-visible:ring-offset-2"
          >
            Start over
          </button>
        </div>
      </div>
    </>
  );
}
