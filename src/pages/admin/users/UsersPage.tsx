import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/assets/icon/icons";
import {
  PageHead,
  PageHeadActions,
  PageHeadDescription,
  PageHeadRow,
  PageHeadTitle,
} from "@/components/ui/head-page";
import { useGetUsers } from "@/hooks/use-users";
import { usersColumns } from "./UsersColumns";
import { DataGlobalTable } from "@/components/atoms/admin/table";
import { useTable } from "@/hooks/use-table";
import SearchToolbar from "@/components/atoms/admin/SearchToolbar";

export default function UsersPage() {
  const [{ pageIndex, pageSize } /* , setPagination */] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const query = useGetUsers({
    page: pageIndex + 1,
    limit: pageSize,
  });

  const userData = React.useMemo(() => {
    const res = query.data;
    if (res && res.status === "success") {
      return (res as any).data;
    }
    return [];
  }, [query.data]);

  const columnsTable = React.useMemo(() => usersColumns, []);

  const tabl = useTable({
    data: userData,
    columns: columnsTable,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <UsersPageToolbar />
      <UsersTableSection table={tabl} query={query} />
    </div>
  );
}

function UsersPageToolbar() {
  return (
    <>
      <PageHead>
        <PageHeadRow>
          <PageHeadActions align="start" responsive="col">
            <PageHeadTitle>User Management</PageHeadTitle>
            <PageHeadDescription>
              Manage your application users, roles, and access permissions.
            </PageHeadDescription>
          </PageHeadActions>
          <PageHeadActions align="end" responsive="row">
            <Button variant="outline" size="sm">
              select
              <Icon.XIcon />
            </Button>
            <Button size="sm">
              <Icon.UserPlusIcon />
              Create New User
            </Button>
          </PageHeadActions>
        </PageHeadRow>
        <PageHeadRow>
          <SearchToolbar name="email or username" />
          <PageHeadActions align="end" responsive="row">
            <Button variant="outline" size="sm">
              <Icon.XIcon /> Reset
            </Button>
            <Button variant="outline" size="sm">
              <Icon.FilterIcon /> Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon.DownloadIcon /> Export CSV
            </Button>
          </PageHeadActions>
        </PageHeadRow>
      </PageHead>
    </>
  );
}

function UsersTableSection({ table, query }: { table: any; query: any }) {
  return <DataGlobalTable table={table} name="users" query={query} />;
}

// const table = useReactTable({
//   getCoreRowModel: getCoreRowModel(),
//   data: userData,
//   columns: columnsTable,
//   manualPagination: true,
//   rowCount: totalRows,
//   state: {
//     pagination: {
//       pageIndex,
//       pageSize,
//     },
//   },
//   onPaginationChange: setPagination,
// });
