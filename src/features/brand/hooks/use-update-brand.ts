import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"
import type { BrandEntity } from "@/features/brand/model/brand.entity"
import {
  updateBrandZod,
  type TUpdateBrandDTO,
  type TUpdateBrandEX,
} from "@/features/brand/model/brand.schema"

/** Updates an existing brand via `PATCH /brands/:id`. */
export function useUpdateBrand(brand: BrandEntity, onUpdated?: () => void) {
  const queryClient = useQueryClient()

  const form = useZod<TUpdateBrandDTO, TUpdateBrandEX>({
    schema: updateBrandZod,
    defaultValues: {
      name: brand.name,
      status: brand.status,
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: [...queryKeys.brands.all, "update", brand.id],
    mutationFn: (values: TUpdateBrandEX) =>
      brandService.update(brand.id, values),
    onSuccess: (updated) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      onUpdated?.()
      toast.add({
        type: "success",
        title: "Brand updated",
        description: updated.name,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const updateSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, updateSubmit }
}
