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
  brandColumns,
  brandTableFeatures,
} from "@/features/brand/components/brand-columns"
import type { BrandEntity } from "@/features/brand/model/brand.entity"
import { PaginationTable } from "@/components/common/table/pagination.table"

interface IBrandsTableProps {
  data: BrandEntity[]
  total: number
  pagination: PaginationState
  onPaginationChange: OnChangeFn<PaginationState>
  isLoading?: boolean
  isError?: boolean
}

export function BrandsTable({
  data,
  total,
  pagination,
  onPaginationChange,
  isLoading,
  isError,
}: IBrandsTableProps) {
  const table = useTable({
    features: brandTableFeatures,
    columns: brandColumns,
    data,
    state: { pagination },
    onPaginationChange,
    manualPagination: true,
    rowCount: total,
  })

  const colSpan = brandColumns.length
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
                Failed to load brands
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={colSpan} className="text-muted-foreground">
                {isLoading ? "Loading brands…" : "No brands found."}
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
