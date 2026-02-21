import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { subCategoriesApi } from "@/core/api/subcategories.api";
import type { UpdateSubCategory } from "@/schema/subcategory.schema";
import toast from "react-hot-toast";
import type { ResponseZod } from "@/contract/global.dto";
import type { SubCategoryDto } from "@/contract/subcategory.dto";



const subCategoriesKeys = {
  all: ["subcategories"] as const,
  list: (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) =>
    [
      ...subCategoriesKeys.all,
      params.page,
      params.limit,
      params.search,
      params.status,
      params.sort,
    ] as const,
  get: (id: string) => [...subCategoriesKeys.all, id] as const,
  create: () => [...subCategoriesKeys.all] as const,
  update: (id: string) => [...subCategoriesKeys.all, id] as const,
  delete: (id: string) => [...subCategoriesKeys.all, id] as const,
};

export function useSubCategories(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
  return useQuery({
    queryKey: subCategoriesKeys.list(params),
    queryFn: () => subCategoriesApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useSubCategory(id: string) {
  return useQuery({
    queryKey: subCategoriesKeys.get(id),
    queryFn: () => subCategoriesApi.getId(id),
    enabled: !!id,
  });
}
export function useCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: subCategoriesApi.create,
    onSuccess: (response: ResponseZod<SubCategoryDto>) => {
      qc.invalidateQueries({ queryKey: subCategoriesKeys.all });
      toast.success(response.message || "Sub-category created successfully");
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
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubCategory }) =>
      subCategoriesApi.update(id, payload),
    onSuccess: (response: ResponseZod<SubCategoryDto>) => {
      qc.invalidateQueries({ queryKey: subCategoriesKeys.all });
      toast.success(response.message || "Sub-category updated successfully");
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
    mutationFn: () => subCategoriesApi.remove(id),
    onSuccess: (response: ResponseZod<SubCategoryDto>) => {
      qc.removeQueries({ queryKey: subCategoriesKeys.delete(id) });
      qc.invalidateQueries({ queryKey: subCategoriesKeys.all });
      toast.success(response.message || "Sub-category deleted successfully");
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    },
  });
}

