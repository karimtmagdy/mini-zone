import * as React from "react";
import { Icon } from "@/assets/icon/icons";
import { PageHeadActions, PageHeadRow } from "@/components/ui/head-page";
import { usersColumns } from "./UsersColumns";
import { useGetUsers } from "@/hooks/use-users";
import { useTable } from "@/hooks/use-table";
import {
  DataGlobalTable,
  DataTableViewColumns,
  ToolbarResetData,
  TableStatusTabs,
  TableSearchSortBar,
  TableSelectionBar,
} from "@/components/atoms/admin/table";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";
import ViewUser from "./ViewUser";
import UpdateUser from "./UpdateUser";
import { useDebounce } from "@/hooks/use-debounce";
import { useTableState } from "@/hooks/use-table-state";
import { useHandleState } from "@/hooks/use-handle-table";
import type { TableStackProps } from "@/contract/table.dto";
import { TopHeadMeta } from "@/components/common/meta";
import { UserAccountStatusEnum } from "@/contract/user.dto";

export default function UsersPage() {
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
  } = useHandleState("users");

  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const tableState = useTableState(tableStateOptions);

  const searchTerm = React.useMemo(() => {
    return (
      (tableState.columnFilters.find((f) => f.id === "email")
        ?.value as string) ?? ""
    );
  }, [tableState.columnFilters]);

  const debouncedSearch = useDebounce(searchTerm, 400);

  const query = useGetUsers({
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

  const userData = React.useMemo(() => {
    return query.data?.data ?? [];
  }, [query.data]);

  const columnsTable = React.useMemo(() => usersColumns, []);

  const table = useTable({
    data: userData,
    columns: columnsTable,
    state: tableState,
    pageCount: query.data?.meta?.pages ?? 0,
    rowCount: query.data?.meta?.total ?? 0,
    manualSorting: true,
  });

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <UsersHeader query={query} table={table} />

      {/* 2. Reusable Search & Sort Bar */}
      <TableSearchSortBar
        query={query}
        table={table}
        searchColumn="email"
        searchPlaceholder="Find users..."
        onExport={() => window.print()}
        sortOptions={[
          {
            value: "updatedAt",
            label: "Latest Update",
            icon: <Icon.HistoryIcon className="opacity-60" />,
          },
          {
            value: "username",
            label: "Username (A-Z)",
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
          { value: "all", label: "All Users" },
          {
            value: UserAccountStatusEnum.ACTIVE,
            label: UserAccountStatusEnum.ACTIVE,
          },
          {
            value: UserAccountStatusEnum.INACTIVE,
            label: UserAccountStatusEnum.INACTIVE,
          },
          {
            value: UserAccountStatusEnum.BANNED,
            label: UserAccountStatusEnum.BANNED,
          },
        ]}
      />

      {/* 4. Main Table */}
      <DataGlobalTable table={table} name="users" query={query} />

      {/* 5. Modals Management */}
      <UsersModals
        deletingId={deletingId}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        viewingId={viewingId}
        isViewOpen={isViewOpen}
        setIsViewOpen={setIsViewOpen}
        editingId={editingId}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
        userData={userData}
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
            },
          },
        ]}
      />
    </div>
  );
}

function UsersHeader({ table }: TableStackProps<any>) {
  return (
    <PageHeadRow align="between" responsive className="mb-2">
      <TopHeadMeta />
      <PageHeadActions align="end" responsive="row" className="items-center">
        <ToolbarResetData table={table} />
        <DataTableViewColumns table={table} />
        <AddUser />
      </PageHeadActions>
    </PageHeadRow>
  );
}

function UsersModals({
  deletingId,
  isDeleteOpen,
  setIsDeleteOpen,
  viewingId,
  isViewOpen,
  setIsViewOpen,
  editingId,
  isEditOpen,
  setIsEditOpen,
  userData,
}: any) {
  return (
    <>
      <DeleteUser
        id={deletingId}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
      <ViewUser
        id={viewingId}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
        data={userData}
      />
      <UpdateUser
        id={editingId}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={userData}
      />
    </>
  );
}
