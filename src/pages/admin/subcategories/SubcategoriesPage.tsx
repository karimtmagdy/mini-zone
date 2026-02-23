import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { PageHeadActions, PageHeadRow } from "@/components/ui/head-page";
import { subCategoryColumns } from "./SubCategoryColumns";
import { useGetSubCategories } from "@/hooks/use-subcategory";
import { useTable } from "@/hooks/use-table";
import {
  DataGlobalTable,
  DataTableViewColumns,
  ToolbarResetData,
  TableStatusTabs,
  TableSearchSortBar,
  TableSelectionBar,
} from "@/components/atoms/admin/table";
import AddSubCategory from "./AddSubCategory";
import DeleteSubCategory from "./DeleteSubCategory";
import ViewSubCategory from "./ViewSubCategory";
import UpdateSubCategory from "./UpdateSubCategory";
import { useDebounce } from "@/hooks/use-debounce";
import { useTableState } from "@/hooks/use-table-state";
import { useHandleState } from "@/hooks/use-handle-table";
import type { TableStackProps } from "@/contract/table.dto";
import { TopHeadMeta } from "@/components/common/meta";
import { SubCategoryStatusEnum } from "@/contract/subcategory.dto";

export default function SubcategoriesPage() {
  const {
    editingId,
    isEditOpen,
    setIsEditOpen,
    deletingId,
    isDeleteOpen,
    setIsDeleteOpen,
    viewingId,
    isViewOpen,
    setIsViewOpen,
    tableStateOptions,
  } = useHandleState("subcategories");

  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const tableState = useTableState(tableStateOptions);

  const searchTerm = React.useMemo(() => {
    return (
      (tableState.columnFilters.find((f) => f.id === "name")
        ?.value as string) ?? ""
    );
  }, [tableState.columnFilters]);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const query = useGetSubCategories({
    page: tableState.pagination.pageIndex + 1,
    limit: tableState.pagination.pageSize,
    search: debouncedSearch,
    status: statusFilter === "all" ? undefined : statusFilter,
    sort: tableState.sorting?.[0]
      ? `${tableState.sorting[0].desc ? "-" : ""}${tableState.sorting[0].id}`
      : undefined,
  });

  const { setPagination } = tableState;
  React.useEffect(() => {
    setPagination((prev) => {
      if (prev.pageIndex === 0) return prev;
      return { ...prev, pageIndex: 0 };
    });
  }, [debouncedSearch, setPagination]);

  const subCategoriesData = React.useMemo(() => {
    return query.data?.data ?? [];
  }, [query.data]);

  const columnsTable = React.useMemo(() => subCategoryColumns, []);

  const table = useTable({
    data: subCategoriesData,
    columns: columnsTable,
    state: tableState,
    pageCount: query.data?.meta?.pages ?? 0,
    rowCount: query.data?.meta?.total ?? 0,
    manualSorting: true,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <SubCategoriesHeader query={query} table={table} />

      {/* 2. Reusable Search & Sort Bar */}
      <TableSearchSortBar
        query={query}
        table={table}
        searchPlaceholder="Find sub-categories..."
        onExport={() => window.print()}
      />

      <TableStatusTabs
        value={statusFilter}
        onValueChange={(val) => {
          setStatusFilter(val);
          tableState.setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        options={[
          { value: "all", label: "All Sub Categories" },
          {
            value: SubCategoryStatusEnum.ACTIVE,
            label: SubCategoryStatusEnum.ACTIVE,
          },
          {
            value: SubCategoryStatusEnum.INACTIVE,
            label: SubCategoryStatusEnum.INACTIVE,
          },
          {
            value: SubCategoryStatusEnum.ARCHIVED,
            label: SubCategoryStatusEnum.ARCHIVED,
          },
        ]}
      />

      {/* 4. Main Table */}
      <DataGlobalTable table={table} name="subcategories" query={query} />

      {/* 5. Modals Management */}
      <SubCategoriesModals
        deletingId={deletingId}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        viewingId={viewingId}
        isViewOpen={isViewOpen}
        setIsViewOpen={setIsViewOpen}
        editingId={editingId}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        subCategoriesData={subCategoriesData}
      />

      {/* 6. Batch Actions Bar (Floating) */}
      <TableSelectionBar
        table={table}
        actions={[
          {
            label: "Export",
            icon: <Icon.DownloadIcon />,
            onClick: (rows) => console.log("Export rows:", rows),
          },
          {
            label: "Delete",
            icon: <Icon.Trash2Icon />,
            variant: "destructive",
            onClick: (rows) => {
              console.log("Delete rows:", rows);
            },
          },
        ]}
      />
    </div>
  );
}

function SubCategoriesHeader({ table }: TableStackProps<any>) {
  return (
    <PageHeadRow align="between" responsive className="mb-2">
      <TopHeadMeta />
      <PageHeadActions align="end" responsive="row" className="items-center">
        <ToolbarResetData table={table} />
        <DataTableViewColumns table={table} />
        <AddSubCategory />
      </PageHeadActions>
    </PageHeadRow>
  );
}

function SubCategoriesModals({
  deletingId,
  isDeleteOpen,
  setIsDeleteOpen,
  viewingId,
  isViewOpen,
  setIsViewOpen,
  editingId,
  isEditOpen,
  setIsEditOpen,
  subCategoriesData,
}: any) {
  return (
    <>
      <DeleteSubCategory
        id={deletingId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <ViewSubCategory
        id={viewingId}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        data={subCategoriesData}
      />
      <UpdateSubCategory
        id={editingId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={subCategoriesData}
      />
    </>
  );
}
