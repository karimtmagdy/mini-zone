import { useMutation, useQueryClient } from "@tanstack/react-query"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { employeeService } from "@/features/employee/api/employee.api"
import {
  createEmployeeZod,
  type TCreateEmployeeDTO,
  type TCreateEmployeeEX,
} from "@/features/employee/model/employee.schema"

/** Hires a new staff member: creates login + employee profile via `/employees/hire`. */
export function useCreateEmployee(onCreated?: () => void) {
  const queryClient = useQueryClient()

  const form = useZod<TCreateEmployeeDTO, TCreateEmployeeEX>({
    schema: createEmployeeZod,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
      department: "operations",
      job: "specialist",
      jobRole: "sales",
      salary: 0,
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: [...queryKeys.employees.all, "hire"],
    mutationFn: async (values: TCreateEmployeeEX) =>
      employeeService.hire({
        username: values.username,
        email: values.email,
        password: values.password,
        department: values.department,
        job: values.job,
        jobRole: values.jobRole,
        salary: values.salary,
        status: "active",
      }),
    onSuccess: (employee) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      form.reset({
        username: "",
        email: "",
        password: "",
        confirm: "",
        department: "operations",
        job: "specialist",
        jobRole: "sales",
        salary: 0,
      })
      onCreated?.()
      toast.add({
        type: "success",
        title: "Employee created",
        description: `${employee.code} · ${employee.jobRole}`,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const createSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, createSubmit }
}
