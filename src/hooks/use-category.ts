import {
  useCategories,
  useCreate,
  useDelete,
  useCategory,
  useUpdate,
} from "@/core/services/category.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createCategoryZod,
  updateCategoryZod,
  type CreateCategory,
  type UpdateCategory,
} from "@/schema/category.schema";


export function useGetCategories(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
  const query = useCategories(params);
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
export function useFormCreateCategory() {
  const createMutation = useCreate();
  const form = useForm<CreateCategory>({
    resolver: zodResolver(createCategoryZod),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const onSubmit = (data: CreateCategory) => {
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

export function useFormUpdateCategory(
  id: string,
  defaultValues?: UpdateCategory
) {
  const updateMutation = useUpdate();
  const form = useForm<UpdateCategory>({
    resolver: zodResolver(updateCategoryZod) as any,
    defaultValues,
  });


  const onSubmit = (data: UpdateCategory) => {
    updateMutation.mutate({ id, payload: data });
  };

  return {
    form,
    onSubmit,
    updateMutation,
  };
}


