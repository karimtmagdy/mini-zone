import { useMutation, useQueryClient } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"

/** Permanently deletes an employee profile via `DELETE /employees/:id`. */
export function useDeleteEmployee(onDeleted?: () => void) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [...queryKeys.employees.all, "delete"],
    mutationFn: (id: string) => employeeService.remove(id),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      onDeleted?.()
      toast.add({
        type: "success",
        title: "Employee deleted",
        description: employee.code,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
