import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateQuizPayload,
  DosableQuestion,
  type DosableQuiz,
  UpdateQuizPayload,
} from "@/lib/intake-form/types";
import { intakeApiClient } from "@/lib/core/config";

export function useQuestionQuery() {
  const queryClient = useQueryClient();

  const createQuestion = useMutation<DosableQuestion, Error, CreateQuizPayload>(
    {
      mutationFn: (payload) => intakeApiClient.createQuestion(payload),
      onSuccess: () => {
        // Invalidate and refetch quizzes list
        queryClient.invalidateQueries({
          queryKey: ["test-intake-form", "quizzes"],
        });
      },
    },
  );

  const listQuestion = useQuery<DosableQuiz[], Error>({
    queryKey: ["test-intake-form", "quizzes"],
    queryFn: async () => await intakeApiClient.listQuestion(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateQuestion = useMutation<
    DosableQuestion,
    Error,
    UpdateQuizPayload | any
  >({
    mutationFn: ({ id, payload }) =>
      intakeApiClient.updateQuestion(id, payload),
    onSuccess: (_, variables) => {
      // Invalidate both the list and the specific quiz if it's cached individually
      queryClient.invalidateQueries({
        queryKey: ["test-intake-form", "quizzes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["test-intake-form", "quiz", variables.id],
      });
      // The main single quiz fetcher uses ["test-intake-form", "quiz"] so we should invalidate that too
      queryClient.invalidateQueries({
        queryKey: ["test-intake-form", "quiz"],
      });
    },
  });

  return {
    createQuestion,
    listQuestion,
    updateQuestion,
  };
}
