// src/server/repositiories/intake.ts
import axios from "axios";
import { getIntakeConfig, LeadPayload, CompleteSessionPayload, ProductResult } from "../schemas/intake";

/**
 * Creates an Axios instance dynamically loaded with the appropriate configuration for the request.
 */
function getItServerApiClient() {
  const { apiKey, tenantId, intakeApiUrl } = getIntakeConfig();
  return axios.create({
    baseURL: intakeApiUrl,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      // tenantId: tenantId,
    },
  });
}

/**
 * Repository containing server-side integrations with the external Dosable API.
 */
export const IntakeRepository = {
  /**
   * Fetches the complete list of intake questionnaire questions.
   */
  async fetchQuestions(): Promise<any[]> {
    const { data } = await getItServerApiClient().get("/questions/");

    console.log(data, "Fetched Questions");
    return data || [];
  },

  /**
   * Initiates a new questionnaire session.
   */
  async createSession(): Promise<{ session_id: string }> {
    const { data } = await getItServerApiClient().post("/sessions/");
    return data;
  },

  /**
   * Saves/updates an answer to a specific question for an active session.
   */
  async saveAnswer(
    sessionId: string,
    questionId: number,
    answer: string | string[],
    questionTitle: string
  ): Promise<any> {
    const { data, status } = await getItServerApiClient().post(
      `/questions/sessions/${sessionId}/questions/${questionId}`,
      {
        [questionId]: {
          value: answer,
          question: questionTitle,
        },
      }
    );
    return { data, status };
  },

  /**
   * Retrieves a previously saved answer to a specific question in an active session.
   */
  async getSavedAnswer(sessionId: string, questionId: number): Promise<any> {
    const { data, status } = await getItServerApiClient().get(
      `/questions/sessions/${sessionId}/questions/${questionId}`
    );
    return { data, status };
  },

  /**
   * Registers or updates a customer lead in the Dosable CRM.
   */
  async createLead(payload: LeadPayload): Promise<any> {
    const { data, status } = await getItServerApiClient().post("/leads/", payload);
    return { data, status };
  },

  /**
   * Submits final questionnaire responses, completing the session.
   */
  async completeSession(sessionId: string, payload: CompleteSessionPayload): Promise<any> {
    const { data, status } = await getItServerApiClient().post(
      `/sessions/${sessionId}/complete`,
      payload
    );
    console.log('payload', payload)
    return { data, status };
  },

  /**
   * Fetches available products from the Dosable API.
   * Uses the configured API client so that it dynamically respects APP_MODE and custom manual credentials.
   */
  async fetchProducts(): Promise<ProductResult[]> {
    const { data } = await getItServerApiClient().get("/products/");
    return data || [];
  },
};
