import {
  useTable,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  employeeColumns,
  employeeTableFeatures,
} from "@/features/employee/components/employee-columns"
import type { EmployeeEntity } from "@/features/employee/model/employee.entity"
import { PaginationTable } from "@/components/common/table/pagination.table"

interface IEmployeesTableProps {
  data: EmployeeEntity[]
  total: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  isLoading?: boolean
  isError?: boolean
}

export function EmployeesTable({
  data,
  total,
  pagination,
  onPaginationChange,
  isLoading,
  isError,
}: IEmployeesTableProps) {
  const table = useTable({
    features: employeeTableFeatures,
    columns: employeeColumns,
    data,
    state: { pagination },
    onPaginationChange,
    manualPagination: true,
    rowCount: total,
  })

  const colSpan = employeeColumns.length
  const rows = table.getRowModel().rows

  return (
    <div className="space-y-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell colSpan={colSpan} className="text-destructive">
                Failed to load employees
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} className="text-muted-foreground">
                {isLoading ? "Loading employees…" : "No employees found."}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <PaginationTable pagination={pagination} total={total} table={table} />
    </div>
  )
}
