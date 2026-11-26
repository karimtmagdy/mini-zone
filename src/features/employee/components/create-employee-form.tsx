import { Eye, EyeOff, LockIcon, MailIcon, UserRoundIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/common/form"
import { useVisibility } from "@/hooks/use-visibility"
import { useCreateEmployee } from "@/features/employee/hooks/use-create-employee"
import {
  createEmployeeZod,
  DEPARTMENT_OPTIONS,
  JOB_OPTIONS,
  JOB_ROLE_OPTIONS,
} from "@/features/employee/model/employee.schema"
import { CardForm } from "@/components/common/card-form"

interface ICreateEmployeeFormProps {
  onCreated?: () => void
}

export function CreateEmployeeForm({ onCreated }: ICreateEmployeeFormProps) {
  const { form, mutation, createSubmit } = useCreateEmployee(onCreated)
  const { visible, toggle } = useVisibility(["password", "confirm"] as const)

  return (
    <CardForm
      onSubmit={createSubmit}
      className="grid gap-3 rounded-lg border p-4 md:grid-cols-2"
    >
      <p className="text-sm text-muted-foreground md:col-span-2">
        Creates a login account, then links an employee profile with the chosen
        job role and permissions.
      </p>

      <FormField
        form={form}
        name="username"
        label="Username"
        placeholder="staff name"
        schema={createEmployeeZod}
        iconStart={<UserRoundIcon />}
      />
      <FormField
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="staff@example.com"
        schema={createEmployeeZod}
        iconStart={<MailIcon />}
      />
      <FormField
        form={form}
        name="password"
        label="Password"
        type={visible.password ? "text" : "password"}
        placeholder="••••••"
        schema={createEmployeeZod}
        iconStart={<LockIcon />}
        iconEnd={visible.password ? <EyeOff /> : <Eye />}
        iconEndLabel={visible.password ? "Hide password" : "Show password"}
        onIconEndClick={() => toggle("password")}
      />
      <FormField
        form={form}
        name="confirm"
        label="Confirm password"
        type={visible.confirm ? "text" : "password"}
        placeholder="••••••"
        schema={createEmployeeZod}
        iconStart={<LockIcon />}
        iconEnd={visible.confirm ? <EyeOff /> : <Eye />}
        iconEndLabel={visible.confirm ? "Hide password" : "Show password"}
        onIconEndClick={() => toggle("confirm")}
      />
      <FormField
        form={form}
        name="department"
        label="Department"
        type="select"
        options={DEPARTMENT_OPTIONS}
        schema={createEmployeeZod}
      />
      <FormField
        form={form}
        name="job"
        label="Job"
        type="select"
        options={JOB_OPTIONS}
        schema={createEmployeeZod}
      />
      <FormField
        form={form}
        name="jobRole"
        label="Job role"
        type="select"
        options={JOB_ROLE_OPTIONS}
        schema={createEmployeeZod}
      />
      <FormField
        form={form}
        name="salary"
        label="Salary"
        type="number"
        placeholder="0"
        schema={createEmployeeZod}
      />

      <div className="md:col-span-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating employee…" : "Add employee"}
        </Button>
      </div>
    </CardForm>
  )
}
