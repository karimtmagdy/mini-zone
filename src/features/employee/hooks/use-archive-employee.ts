import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"

/** Archives an employee profile via `PATCH /employees/archive/:id`. */
export function useArchiveEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.employees.all, "archive"],
    mutationFn: (id: string) => employeeService.archive(id),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.add({
        type: "success",
        title: "Employee archived",
        description: employee.code,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
