import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useGetUsers } from "@/hooks/use-users";
// import { useDebounce } from "@/hooks/use-debounce";
import { usersColumns } from "./UsersColumns";
import type { UserDto } from "@/contract/user.dto";
import { NoResultsFound } from "@/components/atoms/admin/table";

export default function UsersPage() {
  // const [search, setSearch] = React.useState(
  //   usersData.filter(
  //     (user) =>
  //       user.username.toLowerCase().includes(search.toLowerCase()) ||
  //     user.email.toLowerCase().includes(search.toLowerCase()),
  //   ),
  // );
  // const debouncedSearch = useDebounce(search, 300);
  const { data, isFetching } = useGetUsers();
  // data is ResponseType<UserDto[]> - check status before accessing data
  let userData: UserDto[] = [];
  if (data?.status === "success") {
    userData = data.data as UserDto[];
  }
  console.log("Users Data:", userData);
  const columnsTable = React.useMemo(() => usersColumns, []);

  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    data: userData,
    columns: columnsTable,
  });
  // const tableMemo = React.useMemo(() => {
  //   return table;
  // }, [table]);
  console.count("UsersPage Render");

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
                {isFetching ? (
                  <Icon.Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon.SearchIcon />
                )}
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
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <NoResultsFound loading={isFetching} name="users" table={table} />
          )}
        </TableBody>
      </Table>
    </div>
  );
}
