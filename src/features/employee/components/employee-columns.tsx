import {
  createColumnHelper,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { EmployeeRowActions } from "@/features/employee/components/employee-row-actions"
import type {
  EmployeeEntity,
  EmployeeStatus,
} from "@/features/employee/model/employee.entity"

export const employeeTableFeatures = tableFeatures({ rowPaginationFeature })

const helper = createColumnHelper<
  typeof employeeTableFeatures,
  EmployeeEntity
>()

const STATUS_VARIANT: Record<
  EmployeeStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  active: "default",
  pending: "secondary",
  suspended: "outline",
  inactive: "outline",
  terminated: "destructive",
  banned: "destructive",
  archive: "secondary",
}

export const employeeColumns = helper.columns([
  helper.accessor("code", { header: "Code" }),
  helper.accessor("jobRole", { header: "Job role" }),
  helper.accessor("department", { header: "Department" }),
  helper.accessor("job", { header: "Job" }),
  helper.accessor("salary", {
    header: "Salary",
    cell: ({ getValue }) => getValue().toLocaleString(),
  }),
  helper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue()
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    },
  }),
  helper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => <EmployeeRowActions employee={row.original} />,
  }),
])
