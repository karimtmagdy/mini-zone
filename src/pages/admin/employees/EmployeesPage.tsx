import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { PaginationState } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { usePermission } from "@/features/auth/hooks/use-permission"
import { CreateEmployeeForm } from "@/features/employee/components/create-employee-form"
import { EmployeesTable } from "@/features/employee/components/employees-table"
import { useEmployees } from "@/features/employee/hooks/use-employees"
import { PATHS } from "@/lib/router/basic.routes"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function EmployeesPage() {
  const navigate = useNavigate()
  const { can, account } = usePermission()
  const canRead = can("employee:read")
  const canCreate = can("employee:create")
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading, isError, refetch } = useEmployees({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  return (
    <main className="space-y-6 p-4">
      <nav className="flex items-center justify-between">
        <article>
          <h1 className="text-xl font-medium">Employees</h1>
          <p className="text-sm text-muted-foreground">
            Add staff accounts and manage job roles.
          </p>
        </article>
        <article className="flex items-center gap-2">
          {canCreate ? (
            <Dialog>
              <DialogTrigger render={<Button>Add employee</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Employee</DialogTitle>
                  <DialogDescription>
                    Fill in the form to add a new employee.
                  </DialogDescription>
                </DialogHeader>
                <CreateEmployeeForm
                  onCreated={() => {
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                    void refetch()
                  }}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Button onClick={() => navigate(PATHS.auth.setup_admin)}>
              Setup Admin
            </Button>
          )}
        </article>
      </nav>

      {canRead ? (
        <EmployeesTable
          data={data?.list ?? []}
          total={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <p>
            You need <code>employee:read</code> to view staff.
          </p>
          <p className="mt-1">
            Role now: <strong>{account?.role ?? "unknown"}</strong>. Finish
            Setup Admin then sign in again so the token carries admin
            permissions.
          </p>
        </div>
      )}
    </main>
  )
}
