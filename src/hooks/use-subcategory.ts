import {
  useSubCategories,
  useCreate,
  useDelete,
  useSubCategory,
  useUpdate,
} from "@/core/services/subcategory.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createSubCategoryZod,
  updateSubCategoryZod,
  type CreateSubCategory,
  type UpdateSubCategory,
} from "@/schema/subcategory.schema";

export function useGetSubCategories(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {

  const query = useSubCategories(params);
  return query;
}
export function useGetSubCategory(id: string) {
  const query = useSubCategory(id);
  return { query };
}
export function useDeleteSubCategory(id: string) {
  const deleteMutation = useDelete(id);
  const onSubmit = () => deleteMutation.mutateAsync();
  return { onSubmit, deleteMutation };
}
export function useFormCreateSubCategory() {
  const createMutation = useCreate();
  const form = useForm<CreateSubCategory>({
    resolver: zodResolver(createSubCategoryZod),
    defaultValues: {
      name: "",
      category: [],
    },

  });
  const onSubmit = (data: CreateSubCategory) => {
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

export function useFormUpdateSubCategory(
  id: string,
  defaultValues?: UpdateSubCategory
) {
  const updateMutation = useUpdate();
  const form = useForm<UpdateSubCategory>({
    resolver: zodResolver(updateSubCategoryZod),
    defaultValues,
  });

  const onSubmit = (data: UpdateSubCategory) => {
    updateMutation.mutate({ id, payload: data });
  };

  return {
    form,
    onSubmit,
    updateMutation,
  };
}
