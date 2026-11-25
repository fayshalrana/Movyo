// lib/intake-form/navigation.ts
import {
  DosableQuestion,
  QuizAnswer,
  HardStopResult,
} from "@/lib/intake-form/types";

/**
 * Parse hard_stop_response which may be a JSON array string or a plain string.
 */
function parseHardStopResponses(raw?: string): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [raw];
  }
}

/**
 * Check whether a given answer triggers a hard stop.
 */
export function checkHardStop(
  question: DosableQuestion,
  answer: string | string[],
): HardStopResult {
  if (!question.is_hard_stop) return { isStop: false };

  const stopResponses = parseHardStopResponses(question.hard_stop_response);
  const answerArr = Array.isArray(answer) ? answer : [answer];

  // For checkbox questions: stop if ANY selected option is in the stop list
  if (question.type === "checkbox") {
    const hasStop = answerArr.some((a) => stopResponses.includes(a));
    if (hasStop) {
      return { isStop: true, message: question.hard_stop_message };
    }
  } else {
    // radio/consent: stop if the answer matches
    if (stopResponses.includes(answerArr[0])) {
      return { isStop: true, message: question.hard_stop_message };
    }
  }

  return { isStop: false };
}

/**
 * Resolve the next question ID given the current question and answer.
 * Returns null if the flow is complete (next = 0 and not a hard stop).
 */
export function resolveNextQuestionId(
  question: DosableQuestion,
  answer: string | string[],
): number | null {
  const answerArr = Array.isArray(answer) ? answer : [answer];
  const primaryAnswer = answerArr[0];

  if (question.next_question_map) {
    const mapped = question.next_question_map[primaryAnswer];

    // Handle the Final object case: { "Final": 0 }
    if (typeof mapped === "object" && mapped !== null) {
      return null; // survey complete
    }

    if (typeof mapped === "number") {
      return mapped === 0 ? null : mapped;
    }

    // Checkbox: find the highest-priority (smallest id) next question
    // among all selected answers that have a mapping
    if (question.type === "checkbox") {
      const mappedIds = answerArr
        .map((a) => question.next_question_map![a])
        .filter((v): v is number => typeof v === "number" && v !== 0)
        .sort((a, b) => a - b);

      return mappedIds[0] ?? null;
    }
  }

  if (question.next_question_id) {
    return question.next_question_id;
  }

  return null;
}

/**
 * Build an ordered list of question IDs visited for a given answer history.
 * Useful for back-navigation and progress tracking.
 */
export function buildQuestionPath(
  questionsMap: Map<number, DosableQuestion>,
  answers: QuizAnswer[],
  firstQuestionId: number,
): number[] {
  const path: number[] = [firstQuestionId];
  let current = firstQuestionId;

  for (const answer of answers) {
    const question = questionsMap.get(current);
    if (!question) break;

    const next = resolveNextQuestionId(question, answer.value);
    if (next === null) break;

    path.push(next);
    current = next;
  }

  return path;
}
