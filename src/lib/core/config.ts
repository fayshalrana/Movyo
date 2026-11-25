import axios from "axios";
import {
  CreateQuizPayload,
  DosableQuestion,
  DosableQuiz,
  UpdateQuizPayload,
} from "@/lib/intake-form/types";
import { api } from "@/lib/requests/api";

// Factory function to create axios instance lazily (at request time, not build time)
function createItServerApi() {
  return axios.create({
    baseURL: process.env.INTAKE_API_URL,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.API_KEY,
      tenantId: process.env.TENANT_ID,
    },
  });
}

// Lazy API instance getter
let _itServerApi: ReturnType<typeof createItServerApi> | null = null;
function getItServerApi() {
  if (!_itServerApi) {
    _itServerApi = createItServerApi();
  }
  return _itServerApi;
}

export const intakeApiClient = {
  async listQuestion(): Promise<DosableQuiz[]> {
    const { data } = await getItServerApi().get<DosableQuiz[]>(
      "/intake-form/questions",
    );
    return data || [];
  },

  async createQuestion(payload: CreateQuizPayload): Promise<DosableQuestion> {
    const { data } = await api.post<DosableQuestion>(
      "/intake-form/questions",
      payload,
    );
    return data;
  },

  async updateQuestion(
    id: string,
    payload: UpdateQuizPayload,
  ): Promise<DosableQuestion> {
    const { data } = await api.put<DosableQuestion>(
      `/intake-form/questions`,
      payload,
    );
    return data;
  },
};
