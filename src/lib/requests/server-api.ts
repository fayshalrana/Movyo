import axios, { isAxiosError, type AxiosRequestConfig } from "axios";

export const serverApiClient = axios.create({
  baseURL: "https://staging.intake.dosable.com",
  headers: {
    "Content-Type": "application/json",
    // Prioritize a dedicated backend API key, but fallback to the public one if necessary
    "x-api-key": process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || "",
  },
});

export const serverApi = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    serverApiClient.get<T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    serverApiClient.post<T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    serverApiClient.put<T>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    serverApiClient.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    serverApiClient.delete<T>(url, config),
};

export { isAxiosError };
