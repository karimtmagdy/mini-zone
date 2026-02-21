import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { PageHeadActions, PageHeadRow } from "@/components/ui/head-page";
import { brandColumns } from "./BrandColumns";
import { useGetBrands } from "@/hooks/use-brand";
import { useTable } from "@/hooks/use-table";
import {
  DataGlobalTable,
  DataTableViewColumns,
  ToolbarResetData,
  TableStatusTabs,
  TableSearchSortBar,
  TableSelectionBar,
} from "@/components/atoms/admin/table";
import AddBrand from "./AddBrand";
import DeleteBrand from "./DeleteBrand";
import ViewBrand from "./ViewBrand";
import UpdateBrand from "./UpdateBrand";
import { useDebounce } from "@/hooks/use-debounce";
import { useTableState } from "@/hooks/use-table-state";
import { useHandleState } from "@/hooks/use-handle-table";
import type { TableStackProps } from "@/contract/table.dto";
import { BrandStatusEnum } from "@/contract/brand.dto";
import { TopHeadMeta } from "@/components/common/meta";
export default function BrandsPage() {
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
  } = useHandleState("brands");

  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const tableState = useTableState(tableStateOptions);

  const searchTerm = React.useMemo(() => {
    return (
      (tableState.columnFilters.find((f) => f.id === "name")
        ?.value as string) ?? ""
    );
  }, [tableState.columnFilters]);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const query = useGetBrands({
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

  const brandsData = React.useMemo(() => {
    return query.data?.data ?? [];
  }, [query.data]);

  const columnsTable = React.useMemo(() => brandColumns, []);

  const table = useTable({
    data: brandsData,
    columns: columnsTable,
    state: tableState,
    pageCount: query.data?.meta?.pages ?? 0,
    rowCount: query.data?.meta?.total ?? 0,
    manualSorting: true,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <BrandsHeader query={query} table={table} />

      {/* 2. Reusable Search & Sort Bar */}
      <TableSearchSortBar
        query={query}
        table={table}
        searchPlaceholder="Find brands..."
        onExport={() => window.print()}
        sortOptions={[
          {
            value: "updatedAt",
            label: "Latest Update",
            icon: <Icon.HistoryIcon className="opacity-60" />,
          },
          {
            value: "name",
            label: "Name (A-Z)",
            icon: <Icon.TypeIcon className="opacity-60" />,
          },
          {
            value: "createdAt",
            label: "Creation Date",
            icon: <Icon.CalendarIcon className="opacity-60" />,
          },
        ]}
      />

      {/* 3. Reusable Status Tabs */}
      <TableStatusTabs
        value={statusFilter}
        onValueChange={(val) => {
          setStatusFilter(val);
          tableState.setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        }}
        options={[
          { value: "all", label: "All Brands" },
          { value: BrandStatusEnum.ACTIVE, label: BrandStatusEnum.ACTIVE },
          { value: BrandStatusEnum.INACTIVE, label: BrandStatusEnum.INACTIVE },
          { value: BrandStatusEnum.ARCHIVED, label: BrandStatusEnum.ARCHIVED },
        ]}
      />

      {/* 4. Main Table */}
      <DataGlobalTable table={table} name="brands" query={query} />

      {/* 5. Modals Management */}
      <BrandsModals
        deletingId={deletingId}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        viewingId={viewingId}
        isViewOpen={isViewOpen}
        setIsViewOpen={setIsViewOpen}
        editingId={editingId}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        brandsData={brandsData}
      />

      {/* 6. Batch Actions Bar (Floating) */}
      <TableSelectionBar
        table={table}
        actions={[
          {
            label: "Status",
            icon: <Icon.CheckCircleIcon />,
            onClick: (rows) => console.log("Change Status for:", rows),
          },
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
              // هنا ممكن نفتح نافذة تأكيد حذف جماعي
            },
          },
        ]}
      />
    </div>
  );
}

/**
 * Components local to BrandsPage that use specialized layout
 */
function BrandsHeader({ table }: TableStackProps<any>) {
  return (
    <PageHeadRow align="between" responsive className="mb-2">
      <TopHeadMeta />
      <PageHeadActions align="end" responsive="row" className="items-center">
        <ToolbarResetData table={table} />
        <DataTableViewColumns table={table} />
        <AddBrand />
      </PageHeadActions>
    </PageHeadRow>
  );
}

function BrandsModals({
  deletingId,
  isDeleteOpen,
  setIsDeleteOpen,
  viewingId,
  isViewOpen,
  setIsViewOpen,
  editingId,
  isEditOpen,
  setIsEditOpen,
  brandsData,
}: any) {
  return (
    <>
      <DeleteBrand
        id={deletingId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <ViewBrand
        id={viewingId}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        data={brandsData}
      />
      <UpdateBrand
        id={editingId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={brandsData}
      />
    </>
  );
}
