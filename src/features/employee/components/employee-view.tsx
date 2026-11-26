import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { EmployeeEntity } from "@/features/employee/model/employee.entity"
import { DetailView } from "@/components/common/detail-view"

interface IEmployeeViewProps {
  employee: EmployeeEntity
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : "—"
}

/** Read-only dialog showing a single employee profile. */
export function EmployeeView({
  employee,
  open,
  onOpenChange,
}: IEmployeeViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{employee.code}</DialogTitle>
          <DialogDescription>
            {employee.jobRole} · {employee.department}
          </DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <DetailView label="Status" value={<Badge>{employee.status}</Badge>} />
          <DetailView label="Salary" value={employee.salary.toLocaleString()} />
          <DetailView label="Job" value={employee.job} />
          <DetailView label="Job role" value={employee.jobRole} />
          <DetailView label="Department" value={employee.department} />
          <DetailView
            label="Archived"
            value={employee.isArchived ? "Yes" : "No"}
          />
          <DetailView label="Hired at" value={formatDate(employee.hiredAt)} />
          <DetailView label="Left at" value={formatDate(employee.leftAt)} />
          <DetailView
            label="Created at"
            value={formatDate(employee.createdAt)}
          />
          <DetailView
            label="Updated at"
            value={formatDate(employee.updatedAt)}
          />
        </dl>
      </DialogContent>
    </Dialog>
  )
}
