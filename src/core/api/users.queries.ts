import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { usersApi } from "@/core/services/users.service";
import type { UpdateUser } from "@/schema/user.schema";

const USERS_KEY = ["users"];

export function useUsers(params: {
  page: number;
  limit: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [...USERS_KEY, params],
    queryFn: () => usersApi.list(params),
    placeholderData: keepPreviousData,
    // enabled: !!params,
  });
}
export function useUser(id: string) {
  return useQuery({
    queryKey: [...USERS_KEY, id],
    queryFn: () => usersApi.getId(id),
    enabled: !!id,
  });
}
export function useCreate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: usersApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useUpdate() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUser }) =>
      usersApi.update(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}

export function useDelete(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: () => usersApi.remove(id),
    onSuccess: () => {
      qc.removeQueries({ queryKey: [...USERS_KEY, id] });
      qc.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
