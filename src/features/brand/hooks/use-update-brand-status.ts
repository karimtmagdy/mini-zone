import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { brandService } from "@/features/brand/api/brand.api"
import type { BrandStatus } from "@/features/brand/model/brand.entity"

interface IUpdateBrandStatusVars {
  id: string
  status: BrandStatus
}

/** Changes a brand status via `PATCH /brands/status/:id`. */
export function useUpdateBrandStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.brands.all, "status"],
    mutationFn: ({ id, status }: IUpdateBrandStatusVars) =>
      brandService.updateStatus(id, status),
    onSuccess: (brand) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.brands.all })
      toast.add({
        type: "success",
        title: "Status updated",
        description: `${brand.name} · ${brand.status}`,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
