import type { ColumnDef } from "@tanstack/react-table";
import type { UserDto } from "@/contract/user.dto";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/assets/icon/icons";
import { DataTableCellViewer } from "@/components/atoms/admin/table";
import {
  formatRelativeTime,
  formatShortDate,
  formatTimestamp,
} from "@/lib/date";

export const usersColumns: ColumnDef<UserDto>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false, //disable sorting
    enableHiding: false, //hide column
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="email" />;
    },
    cell: ({ row }) => {
      const email = row.original.email;
      const username = row.original.username;
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{username}</span>
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Icon.MailIcon className="size-3" />
            {email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="role" />;
    },
    cell: ({ row }) => row.original.role,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="status" />;
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status}
        </Badge>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, id, filterValue) => {
      if (!filterValue.length) return true;
      return filterValue.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "activeAt",
    header: ({ column }) => {
      return (
        <DataTableCellViewer
          column={column}
          title="activeAt"
          className="hidden @2xl:flex"
        />
      );
    },
    cell: ({ row }) => {
      const activeAt = row.original.activeAt;
      return activeAt ? (
        <span className="text-muted-foreground hidden items-center gap-1 text-xs @2xl:flex">
          <Icon.ClockIcon className="size-3" />
          {activeAt.toLocaleString()}
        </span>
      ) : (
        <span className="text-muted-foreground hidden gap-1 text-xs @2xl:flex @2xl:items-center">
          <Icon.ClockIcon className="size-3" />
          Never
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="createdAt" />;
    },
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="flex items-center gap-2">
          <Icon.CalendarIcon />
          <div className="flex flex-col -space-y-1">
            <span className="text-sm">{formatShortDate(date)}</span>
            <span className="text-muted-foreground text-xs">
              {formatTimestamp(date, "h:mm a")}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <DataTableCellViewer
          column={column}
          title="updatedAt"
          className="hidden @2xl:flex"
        />
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      const updatedAt = row.original.updatedAt;
      if (createdAt === updatedAt) {
        return (
          <small className="text-muted-foreground hidden w-full select-none @2xl:flex @2xl:justify-center">
            --
          </small>
        );
      }
      const date = new Date(updatedAt);
      return (
        <div className="hidden @2xl:flex @2xl:items-center @2xl:gap-2">
          <Icon.CalendarIcon />
          <div className="flex flex-col -space-y-1">
            <span className="text-sm">{formatShortDate(date)}</span>
            <span className="text-muted-foreground text-xs">
              {formatRelativeTime(date)}
            </span>
          </div>
        </div>
      );
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
{
  /* <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted/30 transition-colors"
            > 
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon.ShieldIcon className="text-muted-foreground h-3 w-3" />
                  <span className="text-sm font-medium">{user.role}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    user.status === "Active"
                      ? "success"
                      : user.status === "Inactive"
                        ? "pending"
                        : "destructive"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground font-mono text-sm">
                {user.joined}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Icon.MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.EditIcon className="text-primary h-4 w-4" /> Edit
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.ShieldIcon className="h-4 w-4 text-orange-500" />{" "}
                      Change Role
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                      <Icon.Trash2Icon className="h-4 w-4" /> Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */
}
