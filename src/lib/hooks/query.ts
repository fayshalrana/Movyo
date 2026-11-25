import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";
import { api, isAxiosError } from "@/lib/requests/api";

export function useList<T>(resource: string, options?: UseQueryOptions<T[], Error>) {
  return useQuery<T[], Error>({
    queryKey: [resource],
    queryFn: () => api.get<T[]>(resource).then((res) => res.data),
    ...options,
  });
}

export function useGet<T>(
  resource: string,
  id: string,
  options?: UseQueryOptions<T, Error>,
) {
  return useQuery<T, Error>({
    queryKey: [resource, id],
    queryFn: () => api.get<T>(`${resource}/${id}`).then((res) => res.data),
    ...options,
  });
}

export function useCreate<T, TVariables = unknown>(
  resource: string,
  options?: UseMutationOptions<T, Error, TVariables>,
) {
  return useMutation<T, Error, TVariables>({
    mutationFn: (variables) =>
      api.post<T>(resource, variables).then((res) => res.data),
    ...options,
  });
}

export function useUpdate<T, TVariables = unknown>(
  resource: string,
  options?: UseMutationOptions<T, Error, TVariables>,
) {
  return useMutation<T, Error, TVariables>({
    mutationFn: (variables) =>
      api.patch<T>(`${resource}`, variables).then((res) => res.data),
    ...options,
  });
}

export function useDelete<T>(
  resource: string,
  options?: UseMutationOptions<T, Error, string>,
) {
  return useMutation<T, Error, string>({
    mutationFn: (id) => api.delete<T>(`${resource}/${id}`).then((res) => res.data),
    ...options,
  });
}

export { isAxiosError };