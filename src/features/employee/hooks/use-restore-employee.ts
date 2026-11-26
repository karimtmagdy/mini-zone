import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"

/** Restores an archived employee profile via `PATCH /employees/restore/:id`. */
export function useRestoreEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.employees.all, "restore"],
    mutationFn: (id: string) => employeeService.restore(id),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.add({
        type: "success",
        title: "Employee restored",
        description: employee.code,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
