import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { usePermission } from "@/features/auth/hooks/use-permission"
import { CreateEmployeeForm } from "@/features/employee/components/create-employee-form"
import { useEmployees } from "@/features/employee/hooks/use-employees"
import { PATHS } from "@/lib/router/basic.routes"

export function EmployeesPage() {
  const navigate = useNavigate()
  const { can, account } = usePermission()
  const canRead = can("employee:read")
  const canCreate = can("employee:create")
  const { data, isLoading, isError, error, refetch } = useEmployees({
    page: 1,
    limit: 20,
  })

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-medium">Employees</h1>
          <p className="text-sm text-muted-foreground">
            Add staff accounts and manage job roles.
          </p>
        </div>
        {!canCreate && (
          <Button onClick={() => navigate(PATHS.auth.setup_admin)}>
            Setup Admin
          </Button>
        )}
      </div>

      {canCreate ? (
        <CreateEmployeeForm onCreated={() => void refetch()} />
      ) : (
        <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <p>
            You need <code>employee:create</code> to add staff.
          </p>
          <p className="mt-1">
            Role now: <strong>{account?.role ?? "unknown"}</strong>. Finish{" "}
            <button
              type="button"
              className="underline"
              onClick={() => navigate(PATHS.auth.setup_admin)}
            >
              Setup Admin
            </button>{" "}
            then sign in again so the token carries admin permissions.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <h2 className="text-sm font-medium">Staff directory</h2>

        {!canRead ? (
          <p className="text-sm text-muted-foreground">
            Missing <code>employee:read</code> — list is hidden.
          </p>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground">Loading employees…</p>
        ) : isError ? (
          <p className="text-sm text-destructive">
            {(error as Error)?.message ?? "Failed to load employees"}
          </p>
        ) : data?.list.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No employees yet. Use the form above to add the first staff member
            after your admin account.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Code</th>
                  <th className="px-3 py-2 font-medium">Job role</th>
                  <th className="px-3 py-2 font-medium">Department</th>
                  <th className="px-3 py-2 font-medium">Job</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.list.map((employee) => (
                  <tr key={employee.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">
                      {employee.code}
                    </td>
                    <td className="px-3 py-2">{employee.jobRole}</td>
                    <td className="px-3 py-2">{employee.department}</td>
                    <td className="px-3 py-2">{employee.job}</td>
                    <td className="px-3 py-2">{employee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
