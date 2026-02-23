import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from "@tanstack/react-query";

export function useAppQuery<TData = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery({
    queryKey,
    queryFn,
    staleTime: 1000 * 60 * 5, // 5 minutes global default
    retry: 1,
    refetchOnWindowFocus: false,
    ...options, // allow override per query
  });
}
