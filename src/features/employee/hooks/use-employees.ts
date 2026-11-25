import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { employeeApi } from "@/features/employee/api/employee.api"
import { usePermission } from "@/features/auth/hooks/use-permission"

export function useEmployees(params?: {
  page?: number
  limit?: number
  search?: string
}) {
  const { can } = usePermission()

  return useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn: () => employeeApi.list(params),
    enabled: can("employee:read"),
  })
}
