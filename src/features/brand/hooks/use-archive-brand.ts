import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"

/** Archives a brand via `PATCH /brands/archive/:id`. */
export function useArchiveBrand() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.brands.all, "archive"],
    mutationFn: (id: string) => brandService.archive(id),
    onSuccess: (brand) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      toast.add({
        type: "success",
        title: "Brand archived",
        description: brand.name,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
