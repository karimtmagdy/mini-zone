import {
  useBrands,
  useBrand,
  useCreateBrand,
  useDelete,
  useUpdate,
} from "@/core/services/brands.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBrandZod,
  updateBrandZod,
  type CreateBrand,
  type UpdateBrand,
} from "@/schema/brand.schema";

export function useGetBrands(params: {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  sort?: string;
}) {
  const query = useBrands(params);
  return query;
}
export function useGetBrand(id: string) {
  const query = useBrand(id);
  return { query };
}
export function useDeleteBrand(id: string) {
  const deleteMutation = useDelete(id);
  const onSubmit = () => deleteMutation.mutateAsync();
  return { onSubmit, deleteMutation };
}
export function useFormCreateBrand() {
  const createMutation = useCreateBrand();
  const form = useForm<CreateBrand>({
    resolver: zodResolver(createBrandZod),
    defaultValues: {
      name: "",
      status: "active",
      // image: { url: "", publicId: "" },
    },
  });
  const onSubmit = (data: CreateBrand) => {
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
export function useFormUpdateBrand(id: string, defaultValues?: UpdateBrand) {
  const updateMutation = useUpdate();

  const form = useForm<UpdateBrand>({
    resolver: zodResolver(updateBrandZod),
    defaultValues: {
      name: defaultValues?.name ?? "",
      status: defaultValues?.status ?? "active", // ✅ default value
    },
  });

  const onSubmit = (data: UpdateBrand) => {
    updateMutation.mutate({ id, payload: data });
  };

  return { form, onSubmit, updateMutation };
}
