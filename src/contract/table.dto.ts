// export type TableDto = {
//   page: number;
//   limit: number;
//   search?: string;
//   sort?: string;
//   order?: "asc" | "desc";
// };
// export interface TableProps<T>{
//     query: UseQueryResult<T, Error>;
//     table: Table<T>;
//     searchPlaceholder?: string;
//     sortOptions: SortOption[];
//     onExport?: () => void;
// }

import type { UseQueryResult } from "@tanstack/react-query";
import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  Row,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
// DefTableProps DefTableType
export interface DefTableProps<T> {
  table: Table<T>;
}
export interface DataTableBodyProps<T> extends DefTableProps<T> {
  loading: boolean;
  name: string;
}
export interface DataGlobalTableProps<T> extends DefTableProps<T> {
  query: UseQueryResult<any, Error>;
  name: string;
}
export interface TableRowProps<T> extends DefTableProps<T> {
  row: Row<T>;
}
export interface TableCellViewerProps<T, TV> {
  column: Column<T, TV>;
  title: string;
  className?: string;
}
export interface TableStackProps<T> extends DefTableProps<T> {
  query: UseQueryResult<T, Error>;
}

// ----------------------------------------------
export interface Options {
  initialPageSize?: number;
  persistenceKey?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export interface UseTableStateReturn {
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: Record<string, boolean>;
  sorting: SortingState;
  pagination: PaginationState;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  setRowSelection: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}
export interface TableOption<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  state: UseTableStateReturn;
  pageCount?: number;
  rowCount?: number;
  manualSorting?: boolean;
}
export type TableStateOptions = {
  initialPageSize: number;
  persistenceKey?: string;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
};

export type HandleStateReturn = {
  editingId: string | null;
  isEditOpen: boolean;
  deletingId: string | null;
  isDeleteOpen: boolean;
  isViewOpen: boolean;
  viewingId: string | null;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tableStateOptions: TableStateOptions;
};
