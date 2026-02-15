import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/assets/icon/icons";
import {
  PageHead,
  PageHeadActions,
  PageHeadDescription,
  PageHeadGroup,
  PageHeadRow,
  PageHeadTitle,
} from "@/components/ui/head-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetUsers } from "@/hooks/use-users";
// import { useDebounce } from "@/hooks/use-debounce";
import { usersColumns } from "./UsersColumns";
import { DataGlobalTable } from "@/components/atoms/admin/table";
import { useTable } from "@/hooks/use-table";
// import type { UserDto } from "@/contract/user.dto";

export default function UsersPage() {
  // const [search, setSearch] = React.useState(
  //   usersData.filter(
  //     (user) =>
  //       user.username.toLowerCase().includes(search.toLowerCase()) ||
  //     user.email.toLowerCase().includes(search.toLowerCase()),
  //   ),
  // );
  // const debouncedSearch = useDebounce(search, 300);
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
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

  const totalRows = React.useMemo(() => {
    const res = query.data;
    if (res && res.status === "success" && (res as any).meta) {
      return (res as any).meta.total;
    }
    return 0;
  }, [query.data]);

  const columnsTable = React.useMemo(() => usersColumns, []);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: userData,
    columns: columnsTable,
    manualPagination: true,
    rowCount: totalRows,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: setPagination,
  });
  console.count("UsersPage Render");
  const tabl = useTable({
    data: userData,
    columns: columnsTable,
    manualPagination: true,
    rowCount: totalRows,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });
  // const filteredUsers = usersData.filter(
  //   (user) =>
  //     user.username.toLowerCase().includes(search.toLowerCase()) ||
  //     user.email.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <div className="flex flex-col gap-6">
      <PageHead>
        <PageHeadRow>
          <PageHeadGroup>
            <PageHeadTitle>User Management</PageHeadTitle>
            <PageHeadDescription>
              Manage your application users, roles, and access permissions.
            </PageHeadDescription>
          </PageHeadGroup>
          <PageHeadActions>
            <Button className="flex items-center gap-2">
              <Icon.UserPlusIcon className="h-4 w-4" />
              Create New User
            </Button>
          </PageHeadActions>
        </PageHeadRow>
        <PageHeadActions resource="search" align="between">
          <InputGroup className="w-full @lg:w-sm">
            <InputGroupAddon>
              <InputGroupButton>
                {/* {isFetching ? (
                  <Icon.Loader2Icon className="h-4 w-4 animate-spin" />
                ) : ( */}
                <Icon.SearchIcon />
                {/*  )} */}
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by username or email..."
              // value={search}
              // onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Icon.FilterIcon className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon.DownloadIcon className="h-4 w-4" /> Export CSV
            </Button>
          </div>
        </PageHeadActions>
      </PageHead>
      <DataGlobalTable table={tabl} name="users" query={query} />
    </div>
  );
}
