// lib/quiz/store.ts
import { create } from "zustand";
import {
  DosableQuestion,
  QuizAnswer,
  StepId,
} from "@/lib/intake-form/types";
import { getQuestionCategory } from "@/lib/intake-form/categories";
import {
  checkHardStop,
  resolveNextQuestionId,
} from "@/lib/intake-form/navigation";

interface QuizState {
  // Data
  questions: Map<number, DosableQuestion>;
  answers: QuizAnswer[];
  sessionId: string | null; // ← add this

  // Navigation
  currentQuestionId: number | null;
  currentStep: StepId;
  isComplete: boolean;
  hardStop: { message: string } | null;
  isBackNavigation: boolean;

  // History stack for back navigation
  questionHistory: number[];

  // Actions
  init: (
    questions: DosableQuestion[],
    firstQuestionId: number,
    sessionId: string,
  ) => void;
  answer: (questionId: number, value: string | string[]) => void;
  back: () => void;
  reset: () => void;
  clearHardStop: () => void;
}

const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      questions: new Map<number, DosableQuestion>(),
      answers: [] as QuizAnswer[],
      sessionId: null as string | null,
    };
  }

  try {
    const storedAnswers = sessionStorage.getItem("movy_quiz_answers");
    const storedQuestions = sessionStorage.getItem("movy_quiz_questions");
    const storedSessionId = sessionStorage.getItem("movy_quiz_session_id");

    const answers = storedAnswers ? JSON.parse(storedAnswers) : [];
    const questionsArr = storedQuestions ? JSON.parse(storedQuestions) : [];
    const questions = new Map<number, DosableQuestion>(questionsArr.map((q: any) => [q.id, q]));
    const sessionId = storedSessionId || null;

    return { questions, answers, sessionId };
  } catch (e) {
    console.error("[useQuizStore] Failed to restore sessionStorage state:", e);
    return {
      questions: new Map<number, DosableQuestion>(),
      answers: [] as QuizAnswer[],
      sessionId: null as string | null,
    };
  }
};

const initialState = getInitialState();

export const useQuizStore = create<QuizState>((set, get) => ({
  questions: initialState.questions,
  answers: initialState.answers,
  sessionId: initialState.sessionId,
  currentQuestionId: null,
  currentStep: "preliminary",
  isComplete: false,
  hardStop: null,
  questionHistory: [],
  isBackNavigation: false,

  init(questions, firstQuestionId, sessionId) {
    const arr = Array.isArray(questions) ? questions : [];
    const map = new Map(arr.map((q) => [q.id, q]));

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("movy_quiz_questions", JSON.stringify(arr));
        sessionStorage.setItem("movy_quiz_session_id", sessionId);
        sessionStorage.setItem("movy_quiz_answers", JSON.stringify([]));
      } catch (e) {
        console.warn("[useQuizStore] Failed to save init state to sessionStorage:", e);
      }
    }

    set({
      sessionId,
      questions: map,
      currentQuestionId: firstQuestionId,
      currentStep: getQuestionCategory(firstQuestionId),
      answers: [],
      questionHistory: [firstQuestionId],
      isComplete: false,
      hardStop: null,
      isBackNavigation: false,
    });
  },

  answer(questionId, value) {
    const { questions, answers, questionHistory } = get();
    const question = questions.get(questionId);
    if (!question) return;

    const stop = checkHardStop(question, value);
    if (stop.isStop) {
      set({ hardStop: { message: stop.message! } });
      return;
    }

    const newAnswers = [
      ...answers.filter((a) => a.questionId !== questionId),
      { questionId, value },
    ];

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("movy_quiz_answers", JSON.stringify(newAnswers));
      } catch (e) {
        console.warn("[useQuizStore] Failed to save answers to sessionStorage:", e);
      }
    }

    const nextId = resolveNextQuestionId(question, value);

    if (nextId === null) {
      console.log("Final form submission answers:", newAnswers);
      set({ answers: newAnswers, isComplete: true, isBackNavigation: false });
      return;
    }

    set({
      answers: newAnswers,
      currentQuestionId: nextId,
      currentStep: getQuestionCategory(nextId),
      questionHistory: [...questionHistory, nextId],
      isBackNavigation: false,
    });
  },

  back() {
    const { questionHistory, answers } = get();
    if (questionHistory.length <= 1) return;

    const newHistory = questionHistory.slice(0, -1);
    const prevId = newHistory[newHistory.length - 1];

    const newAnswers = answers.filter(
      (a) => a.questionId !== questionHistory[questionHistory.length - 1],
    );

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("movy_quiz_answers", JSON.stringify(newAnswers));
      } catch (e) {
        console.warn("[useQuizStore] Failed to save answers to sessionStorage:", e);
      }
    }

    set({
      questionHistory: newHistory,
      currentQuestionId: prevId,
      currentStep: getQuestionCategory(prevId),
      answers: newAnswers,
      hardStop: null,
      isBackNavigation: true,
    });
  },

  reset() {
    if (typeof window !== "undefined") {
      try {
        sessionStorage.removeItem("movy_quiz_questions");
        sessionStorage.removeItem("movy_quiz_session_id");
        sessionStorage.removeItem("movy_quiz_answers");
      } catch (e) {
        console.warn("[useQuizStore] Failed to clear sessionStorage:", e);
      }
    }

    set({
      answers: [],
      sessionId: null,
      currentQuestionId: null,
      currentStep: "preliminary",
      isComplete: false,
      hardStop: null,
      questionHistory: [],
      isBackNavigation: false,
    });

    window.location.reload();
  },

  clearHardStop() {
    set({ hardStop: null });
  },
}));
