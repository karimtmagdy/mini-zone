import {
  getCoreRowModel,
  useReactTable,
  // type PaginationTableState,
  type PaginationState,
  // type TableState,
  type ColumnDef,
  // type Column,
  // type ColumnDefBase,
  type OnChangeFn,
  // type Table,
} from "@tanstack/react-table";

interface props<TData, TValue> {
  data: TData[];
  state: any;
  columns: ColumnDef<TData, TValue[]>;
  onPaginationChange: OnChangeFn<PaginationState>;
}

export function useTable<TData, TValue>({
  data,
  columns,
  state,
  onPaginationChange,
}: props<TData, TValue>) {
  return useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data,
    columns,
    manualPagination: true,
    state,
    // rowCount: totalRows,
    onPaginationChange,
  });
}
