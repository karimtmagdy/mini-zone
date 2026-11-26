import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"

/** Restores an archived brand via `PATCH /brands/restore/:id`. */
export function useRestoreBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.brands.all, "restore"],
    mutationFn: (id: string) => brandService.restore(id),
    onSuccess: (brand) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      toast.add({
        type: "success",
        title: "Brand restored",
        description: brand.name,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
