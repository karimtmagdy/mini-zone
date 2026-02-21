import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usersApi } from "@/core/api/users.api";
import type { UpdateUser } from "@/schema/user.schema";
import toast from "react-hot-toast";
import type { ResponseZod } from "@/contract/global.dto";
import type { UserDto } from "@/contract/user.dto";



const usersKeys = {
  all: ["users"] as const,
  list: (params: {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort?: string;
  }) =>
    [
      ...usersKeys.all,
      params.page,
      params.limit,
      params.search,
      params.status,
      params.sort,
    ] as const,
  get: (id: string) => [...usersKeys.all, id] as const,
  create: () => [...usersKeys.all] as const,
  update: (id: string) => [...usersKeys.all, id] as const,
  delete: (id: string) => [...usersKeys.all, id] as const,
};

export function useUsers(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
  return useQuery({
    queryKey: usersKeys.list(params),
    queryFn: () => usersApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.get(id),
    queryFn: () => usersApi.getId(id),
    enabled: !!id,
  });
}
export function useCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: (response: ResponseZod<UserDto>) => {
      qc.invalidateQueries({ queryKey: usersKeys.all });
      toast.success(response.message || "User created successfully");
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
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUser }) =>
      usersApi.update(id, payload),
    onSuccess: (response: ResponseZod<UserDto>) => {
      qc.invalidateQueries({ queryKey: usersKeys.all });
      toast.success(response.message || "User updated successfully");
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
    mutationFn: () => usersApi.remove(id),
    onSuccess: (response: ResponseZod<UserDto>) => {
      qc.removeQueries({ queryKey: usersKeys.delete(id) });
      qc.invalidateQueries({ queryKey: usersKeys.all });
      toast.success(response.message || "User deleted successfully");
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(message);
    },
  });
}

