import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"
import type { EmployeeEntity } from "@/features/employee/model/employee.entity"
import {
  updateEmployeeZod,
  type TUpdateEmployeeDTO,
  type TUpdateEmployeeEX,
} from "@/features/employee/model/employee.schema"

/** Updates an existing employee profile via `PATCH /employees/:id`. */
export function useUpdateEmployee(
  employee: EmployeeEntity,
  onUpdated?: () => void
) {
  const queryClient = useQueryClient()

  const form = useZod<TUpdateEmployeeDTO, TUpdateEmployeeEX>({
    schema: updateEmployeeZod,
    defaultValues: {
      department: employee.department,
      job: employee.job,
      jobRole: employee.jobRole,
      salary: employee.salary,
      status: employee.status,
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: [...queryKeys.employees.all, "update", employee.id],
    mutationFn: (values: TUpdateEmployeeEX) =>
      employeeService.update(employee.id, values),
    onSuccess: (updated) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      onUpdated?.()
      toast.add({
        type: "success",
        title: "Employee updated",
        description: `${updated.code} · ${updated.jobRole}`,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const updateSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, updateSubmit }
}
