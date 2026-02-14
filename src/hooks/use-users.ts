import {
  useUsers,
  useUser,
  useCreate,
  useDelete,
} from "@/core/api/users.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserZod, type CreateUser } from "@/schema/user.schema";

export function useGetUsers(params: {
  page: number;
  limit: number;
  search?: string;
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
export function useCreateUser() {
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
    createMutation.mutate({
      ...data,
    });
  };

  return {
    form,
    onSubmit,
    createMutation,
  };
}
 
