import { QueryClient, keepPreviousData } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000_00, // 60 seconds
      gcTime: 60_000_00, // 60 seconds
      retry: 1,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      // refetchOnMount: true,
      // refetchOnReconnect: true,
      refetchInterval: 500000,
      // refetchIntervalInBackground: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
