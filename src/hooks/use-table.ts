import type { TableOption } from "@/contract/table.dto";
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function useTable<TData>({
  columns,
  data,
  state,
  pageCount,
  rowCount,
  manualSorting,
}: TableOption<TData>) {
  const table = useReactTable<TData>({
    columns,
    data,
    pageCount,
    rowCount,
    getRowId: (row: any) => row.id || row._id,

    state: {
      pagination: state.pagination,
      columnFilters: state.columnFilters,
      columnVisibility: state.columnVisibility,
      sorting: state.sorting,
      globalFilter: state.globalFilter,
      rowSelection: state.rowSelection,
    },
    onPaginationChange: state.setPagination,
    onColumnFiltersChange: state.setColumnFilters,
    onColumnVisibilityChange: state.setColumnVisibility,
    onSortingChange: state.setSorting,
    onGlobalFilterChange: state.setGlobalFilter,
    onRowSelectionChange: state.setRowSelection,
    meta: {
      onEdit: state.onEdit,
      onDelete: state.onDelete,
      onView: state.onView,
      data: data,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: manualSorting ?? true,
    manualFiltering: true,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getRowCanExpand: () => true,
    enableRowSelection: true,
    enableSubRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
  });

  return table;
}
