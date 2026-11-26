import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { brandService, type IListBrandsParams } from "@/features/brand/api/brand.api"
import { usePermission } from "@/features/auth/hooks/use-permission"

export function useBrands(params?: IListBrandsParams) {
  const { can } = usePermission()

  return useQuery({
    queryKey: queryKeys.brands.list(params),
    queryFn: () => brandService.list(params),
    enabled: can("brand:read"),
    placeholderData: keepPreviousData,
  })
}
