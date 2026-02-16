import {
  usecategories,
  useCreate,
  useDelete,
  useCategory,
} from "@/core/api/category.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCategoryZod,
  type CreateCategory,
} from "@/schema/category.schema";

export function useGetCategories(params: { page: number; limit: number }) {
  const query = usecategories(params);
  return query;
}
export function useGetCategory(id: string) {
  const query = useCategory(id);
  return { query };
}
export function useDeleteCategory(id: string) {
  const deleteMutation = useDelete(id);
  const onSubmit = () => deleteMutation.mutateAsync();
  return { onSubmit, deleteMutation };
}
export function useCreateCategory() {
  const createMutation = useCreate();
  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategoryZod),
    defaultValues: {
      name: "",
      description: "",
      // image: { url: "", publicId: "" },
      // status: "user",
    },
  });
  const onSubmit = (data: CreateCategory) => {
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
