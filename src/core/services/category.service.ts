import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { categoriesApi } from "@/core/api/categories.api";
import type { UpdateCategory } from "@/schema/category.schema";
import toast from "react-hot-toast";
import type { ResponseZod } from "@/contract/global.dto";
import type { CategoryDto } from "@/contract/category.dto";



const categoriesKeys = {
  all: ["categories"] as const,
  list: (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) =>
    [
      ...categoriesKeys.all,
      params.page,
      params.limit,
      params.search,
      params.status,
      params.sort,
    ] as const,
  get: (id: string) => [...categoriesKeys.all, id] as const,
  create: () => [...categoriesKeys.all] as const,
  update: (id: string) => [...categoriesKeys.all, id] as const,
  delete: (id: string) => [...categoriesKeys.all, id] as const,
};

export function useCategories(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
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
    onSuccess: (response: ResponseZod<CategoryDto>) => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success(response.message || "Category created successfully");
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    },
  });
}


export function useUpdate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCategory }) =>
      categoriesApi.update(id, payload),
    onSuccess: (response: ResponseZod<CategoryDto>) => {
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success(response.message || "Category updated successfully");
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    },
  });
}


export function useDelete(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => categoriesApi.remove(id),
    onSuccess: (response: ResponseZod<CategoryDto>) => {
      qc.removeQueries({ queryKey: categoriesKeys.delete(id) });
      qc.invalidateQueries({ queryKey: categoriesKeys.all });
      toast.success(response.message || "Category deleted successfully");
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    },
  });
}

