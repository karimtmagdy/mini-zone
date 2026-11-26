import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"

/** Permanently deletes a brand via `DELETE /brands/:id`. */
export function useDeleteBrand(onDeleted?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.brands.all, "delete"],
    mutationFn: (id: string) => brandService.remove(id),
    onSuccess: (brand) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      onDeleted?.()
      toast.add({
        type: "success",
        title: "Brand deleted",
        description: brand.name,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
