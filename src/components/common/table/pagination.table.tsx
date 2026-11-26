import type {
  PaginationState,
  RowData,
  TableFeatures,
  Table_RowPagination,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

export function PaginationTable({
  pagination,
  total,
  table,
}: {
  pagination: PaginationState
  total: number
  table: Table_RowPagination<TableFeatures, RowData>
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)} ·{" "}
        {total} total
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon-xs"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.firstPage()}
        >
          <ChevronsLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-xs"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon-xs"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          size="icon-xs"
          disabled={!table.getCanLastPage()}
          onClick={() => table.lastPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
