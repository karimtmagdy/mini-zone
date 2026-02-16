import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { categoriesApi } from "@/core/services/categories.service";
import type { UpdateCategory } from "@/schema/category.schema";

const categoriesKeys = {
  all: ["categories"] as const,
  list: (params: { page: number; limit: number; search?: string }) =>
    [...categoriesKeys.all, params.page, params.limit, params.search] as const,
  get: (id: string) => [...categoriesKeys.all, id] as const,
  create: () => [...categoriesKeys.all] as const,
  update: (id: string) => [...categoriesKeys.all, id] as const,
  delete: (id: string) => [...categoriesKeys.all, id] as const,
};

export function usecategories(params: { page: number; limit: number }) {
  return useQuery({
    queryKey: categoriesKeys.list(params),
    queryFn: () => categoriesApi.list(params),
    placeholderData: keepPreviousData,
  });
}
export function useCategory(id: string) {
  return useQuery({
    queryKey: categoriesKeys.get(id),
    queryFn: () => categoriesApi.getId(id),
    enabled: !!id,
  });
}
export function useCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: categoriesApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}

export function useUpdate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCategory }) =>
      categoriesApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}

export function useDelete(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => categoriesApi.remove(id),
    onSuccess: () => {
      qc.removeQueries({ queryKey: categoriesKeys.delete(id) });
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
    },
  });
}
