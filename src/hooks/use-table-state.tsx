import * as React from "react";
import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";
import type { Options, UseTableStateReturn } from "@/contract/table.dto";

/**
 * useTableState Hook
 * هذا الهوك مسؤول عن إدارة الحالة (State) الخاصة بالجدول بشكل كامل.
 * يتحكم في التصفية، الترتيب، الصفحات، واختيار الصفوف.
 */
export function useTableState(options?: Options): UseTableStateReturn {
  // حالة فلاتر الأعمدة (مثلاً البحث بالاسم)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  // حالة ظهور الأعمدة (إخفاء/إظهار عمود معين)
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  // حالة اختيار الصفوف (أي الصفوف تم تحديدها بالـ Checkbox)
  const [rowSelection, setRowSelection] = React.useState({});
  // حالة الترتيب (Sorting) - افتراضياً يرتب حسب تاريخ التحديث تنازلياً
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "updatedAt", desc: true },
  ]);
  const { initialPageSize, persistenceKey } = options || {};

  // Read from localStorage on init
  const savedPageSize = React.useMemo(() => {
    if (typeof window === "undefined" || !persistenceKey) return null;
    const saved = localStorage.getItem(`${persistenceKey}-pageSize`);
    return saved ? parseInt(saved, 10) : null;
  }, [persistenceKey]);

  // حالة الترقيم (الصحفة الحالية وحجم الصفحة)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: savedPageSize ?? initialPageSize ?? 5,
  });

  // Save to localStorage when pageSize changes
  React.useEffect(() => {
    if (persistenceKey) {
      localStorage.setItem(
        `${persistenceKey}-pageSize`,
        pagination.pageSize.toString(),
      );
    }
  }, [persistenceKey, pagination.pageSize]);

  // حالة البحث العام
  const [globalFilter, setGlobalFilter] = React.useState("");

  /**
   * useMemo هنا ضروري جداً لضمان استقرار كائن الحالة.
   * بدون useMemo، سيتغير الكائن مع كل Render مما قد يسبب Infinite Loops (كما حدث سابقاً).
   */
  return React.useMemo(
    () => ({
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
      pagination,
      globalFilter,
      setGlobalFilter,
      setColumnFilters,
      setColumnVisibility,
      setRowSelection,
      setSorting,
      setPagination,
      onEdit: options?.onEdit,
      onDelete: options?.onDelete,
      onView: options?.onView,
    }),
    [
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
      pagination,
      globalFilter,
      options?.onEdit,
      options?.onDelete,
      options?.onView,
    ],
  );
}
