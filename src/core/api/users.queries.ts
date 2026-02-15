import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usersApi } from "@/core/services/users.service";
import type { UpdateUser } from "@/schema/user.schema";

const usersKeys = {
  all: ["users"] as const,
  list: (params: { page: number; limit: number; search?: string }) =>
    [...usersKeys.all, params.page, params.limit, params.search] as const,
  get: (id: string) => [...usersKeys.all, id] as const,
  create: () => [...usersKeys.all] as const,
  update: (id: string) => [...usersKeys.all, id] as const,
  delete: (id: string) => [...usersKeys.all, id] as const,
};

export function useUsers(params: { page: number; limit: number }) {
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

export function useUpdate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUser }) =>
      usersApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}

export function useDelete(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => usersApi.remove(id),
    onSuccess: () => {
      qc.removeQueries({ queryKey: usersKeys.delete(id) });
      qc.invalidateQueries({ queryKey: usersKeys.all });
    },
  });
}
