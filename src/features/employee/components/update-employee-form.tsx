import { Button } from "@/components/ui/button"
import { FormField } from "@/components/common/form"
import { CardForm } from "@/components/common/card-form"
import { useUpdateEmployee } from "@/features/employee/hooks/use-update-employee"
import type { EmployeeEntity } from "@/features/employee/model/employee.entity"
import {
  DEPARTMENT_OPTIONS,
  JOB_OPTIONS,
  JOB_ROLE_OPTIONS,
  STATUS_OPTIONS,
  updateEmployeeZod,
} from "@/features/employee/model/employee.schema"

interface IUpdateEmployeeFormProps {
  employee: EmployeeEntity
  onUpdated?: () => void
}

/** Editable profile fields for an existing employee, submitted via `PATCH`. */
export function UpdateEmployeeForm({
  employee,
  onUpdated,
}: IUpdateEmployeeFormProps) {
  const { form, mutation, updateSubmit } = useUpdateEmployee(employee, onUpdated)

  return (
    <CardForm
      as="form"
      onSubmit={updateSubmit}
      className="grid gap-3 rounded-lg border p-4 md:grid-cols-2"
    >
      <FormField
        form={form}
        name="department"
        label="Department"
        type="select"
        options={DEPARTMENT_OPTIONS}
        schema={updateEmployeeZod}
      />
      <FormField
        form={form}
        name="job"
        label="Job"
        type="select"
        options={JOB_OPTIONS}
        schema={updateEmployeeZod}
      />
      <FormField
        form={form}
        name="jobRole"
        label="Job role"
        type="select"
        options={JOB_ROLE_OPTIONS}
        schema={updateEmployeeZod}
      />
      <FormField
        form={form}
        name="salary"
        label="Salary"
        type="number"
        placeholder="0"
        schema={updateEmployeeZod}
      />
      <FormField
        form={form}
        name="status"
        label="Status"
        type="select"
        options={STATUS_OPTIONS}
        schema={updateEmployeeZod}
      />

      <div className="md:col-span-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </CardForm>
  )
}
