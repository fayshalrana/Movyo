import { StepId } from "@/lib/intake-form/types";

export const QUESTION_CATEGORY_MAP: Record<number, StepId> = {
  2900000: "preliminary",
  2900001: "preliminary",
  2900002: "preliminary",
  2900003: "health",
  2900004: "health",
  2900005: "health",
  2900006: "health",
  2900007: "health",
  2900008: "health",
  2900009: "health",
  2900010: "health",
  2900011: "health",
  2900012: "health",
  2900013: "health",
  2900014: "health",
  2900015: "health",
  2900016: "details",
  2900017: "details",
  2900018: "details",
  2900019: "details",
  2900020: "details",
  2900021: "details",
  2900022: "details",
  2900023: "details",
  2900024: "details",
  2900025: "details",
  2900026: "details",
  2900027: "details",
  2900028: "details",
  2900030: "eligibility",
  2900031: "eligibility",
  2900032: "eligibility",
  2900033: "eligibility",
};

/**
 * Resolves the StepId category for any question ID, supporting multiple tenant prefixes dynamically (e.g., 29xxxxx or 58xxxxx).
 */
export function getQuestionCategory(questionId: number | null): StepId {
  if (!questionId) return "preliminary";
  const relativeId = questionId % 100000;
  const lookupId = 2900000 + relativeId;
  return QUESTION_CATEGORY_MAP[lookupId] ?? "preliminary";
}
