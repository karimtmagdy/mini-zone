import {
  useUsers,
  useUser,
  useCreate,
  useUpdate,
  useDelete,
} from "@/core/services/users.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserZod,
  updateUserZod,
  type CreateUser,
  type UpdateUser,
} from "@/schema/user.schema";

export function useGetUsers(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
  const query = useUsers(params);
  return query;
}
export function useGetUser(id: string) {
  const query = useUser(id);
  return { query };
}
export function useDeleteUser(id: string) {
  const deleteMutation = useDelete(id);
  const onSubmit = () => deleteMutation.mutateAsync();
  return { onSubmit, deleteMutation };
}
export function useFormCreateUser() {
  const createMutation = useCreate();
  const form = useForm<CreateUser>({
    resolver: zodResolver(createUserZod),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "user",
    },
  });
  const onSubmit = (data: CreateUser) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return {
    form,
    onSubmit,
    createMutation,
  };
}

export function useFormUpdateUser(id: string, defaultValues?: UpdateUser) {
  const updateMutation = useUpdate();
  const form = useForm<UpdateUser>({
    resolver: zodResolver(updateUserZod),
    defaultValues,
  });

  const onSubmit = (data: UpdateUser) => {
    updateMutation.mutate({ id, payload: data });
  };

  return {
    form,
    onSubmit,
    updateMutation,
  };
}
