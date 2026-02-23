import {
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { brandsApi } from "@/core/api/brands.api";
import type { UpdateBrand } from "@/schema/brand.schema";
import toast from "react-hot-toast";
import type { ResponseZod } from "@/contract/global.dto";
import type { BrandDto } from "@/contract/brand.dto";
import { useAppQuery } from "@/hooks/use-app-query";

const brandsKeys = {
  all: ["brands"] as const,
  list: (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) =>
    [
      ...brandsKeys.all,
      params.page,
      params.limit,
      params.search,
      params.status,
      params.sort,
    ] as const,
  get: (id: string) => [...brandsKeys.all, id] as const,
  create: () => [...brandsKeys.all] as const,
  update: (id: string) => [...brandsKeys.all, id] as const,
  delete: (id: string) => [...brandsKeys.all, id] as const,
};
export function useGetAllBrands(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
 return useAppQuery(
    brandsKeys.list(params),
    () => brandsApi.list(params),
    {
      placeholderData: keepPreviousData,
    },
  );
}

export function useBrand(id: string) {
  return useAppQuery(brandsKeys.get(id), () => brandsApi.getId(id), {
    enabled: !!id,
  });
}
export function useCreateBrand() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: brandsApi.create,
    onSuccess: (response: ResponseZod<BrandDto>) => {
      qc.invalidateQueries({ queryKey: brandsKeys.all });
      // console.log(response);
      toast.success(response.message as string);
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
}

export function useUpdate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateBrand }) =>
      brandsApi.update(id, payload),
    onSuccess: (response: ResponseZod<BrandDto>) => {
      console.log("res", response);
      qc.invalidateQueries({ queryKey: brandsKeys.all });
      toast.success(response.message || "Brand updated successfully");
    },
    onError(error: any) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
}

export function useDelete(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => brandsApi.remove(id),
    onSuccess: (response: ResponseZod<BrandDto>) => {
      // console.log("res", response.data);
      qc.removeQueries({ queryKey: brandsKeys.delete(id) });
      qc.invalidateQueries({ queryKey: brandsKeys.all });
      toast.success(response.message as string);
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(message);
    },
  });
}
