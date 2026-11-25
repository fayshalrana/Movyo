export type DosableOption = {
  id: number;
  question_id: number;
  option_text: string;
};

export type DosableQuestion = {
  id: number;
  version_id: number;
  mapped_field?: string;
  next_question_id?: number | null;
  next_question_map?: Record<string, number | { Final: number }>;
  prev_question_id?: number;
  is_hard_stop: boolean;
  hard_stop_response?: string;
  hard_stop_message?: string;
  title: string;
  type: "textarea" | "radio" | "consent" | "checkbox";
  is_followup: boolean;
  tenant_id: number;
  category_final_question: boolean;
  options: DosableOption[];
};

export type DosableQuiz = DosableQuestion[];

export type CreateQuizPayload = Partial<DosableQuestion>;
export type UpdateQuizPayload = Partial<DosableQuestion>;

export type QuizAnswers = Record<string, string | string[]>;

export type StepId =
  | "start"
  | "preliminary"
  | "health"
  | "details"
  | "eligibility";

export interface Step {
  id: StepId;
  label: string;
  questionIds: number[];
}

export interface QuizAnswer {
  questionId: number;
  value: string | string[];
}

export interface HardStopResult {
  isStop: boolean;
  message?: string;
}
