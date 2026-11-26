import { keepPreviousData, useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import {
  employeeService,
  type IListEmployeesParams,
} from "@/features/employee/api/employee.api"
import { usePermission } from "@/features/auth/hooks/use-permission"

export function useEmployees(params?: IListEmployeesParams) {
  const { can } = usePermission()

  return useQuery({
    queryKey: queryKeys.employees.list(params),
    queryFn: () => employeeService.list(params),
    enabled: can("employee:read"),
    placeholderData: keepPreviousData,
  })
}
