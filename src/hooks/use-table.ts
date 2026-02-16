// type PaginationTableState,
// type PaginationState,
// type TableState,
// type Column,
// type ColumnDefBase,
// type OnChangeFn,
import * as React from "react";
import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  // type Table,
} from "@tanstack/react-table";

interface props<TData> {
  data: TData[];
  state: any;
  columns: ColumnDef<TData, any>[];
  // onPaginationChange: OnChangeFn<PaginationState>;
  manualPagination?: boolean;
}

export function useTable<TData>({
  data,
  columns,
  // state,
  // onPaginationChange,
  // manualPagination
}: props<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  return useReactTable({
    data,
    columns,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    // rowCount: totalRows,
    // onPaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
}
