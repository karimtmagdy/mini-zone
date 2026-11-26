import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"
import type { EmployeeStatus } from "@/features/employee/model/employee.entity"

interface IUpdateEmployeeStatusVars {
  id: string
  status: EmployeeStatus
}

/** Changes an employee status via `PATCH /employees/status/:id`. */
export function useUpdateEmployeeStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.employees.all, "status"],
    mutationFn: ({ id, status }: IUpdateEmployeeStatusVars) =>
      employeeService.updateStatus(id, status),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.add({
        type: "success",
        title: "Status updated",
        description: `${employee.code} · ${employee.status}`,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
