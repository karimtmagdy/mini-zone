import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"
import {
  createBrandZod,
  type TCreateBrandDTO,
  type TCreateBrandEX,
} from "@/features/brand/model/brand.schema"

/** Creates a new brand via `POST /brands`. */
export function useCreateBrand(onCreated?: () => void) {
  const queryClient = useQueryClient()

  const form = useZod<TCreateBrandDTO, TCreateBrandEX>({
    schema: createBrandZod,
    defaultValues: {
      name: "",
      status: "inactive",
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: [...queryKeys.brands.all, "create"],
    mutationFn: (values: TCreateBrandEX) =>
      brandService.create({ name: values.name, status: values.status }),
    onSuccess: (brand) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      form.reset({ name: "", status: "inactive" })
      onCreated?.()
      toast.add({
        type: "success",
        title: "Brand created",
        description: brand.name,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const createSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, createSubmit }
}
