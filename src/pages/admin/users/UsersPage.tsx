import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: "1",
      name: "Karim Ahmed",
      email: "karim@example.com",
      role: "Admin",
      status: "Active",
      joined: "2024-01-15",
    },
    {
      id: "2",
      name: "Sara Ali",
      email: "sara@example.com",
      role: "Manager",
      status: "Active",
      joined: "2024-02-10",
    },
    {
      id: "3",
      name: "Mohamed Hassan",
      email: "mohamed@example.com",
      role: "User",
      status: "Inactive",
      joined: "2024-03-05",
    },
    {
      id: "4",
      name: "Laila Ibrahim",
      email: "laila@example.com",
      role: "User",
      status: "Active",
      joined: "2024-03-12",
    },
    {
      id: "5",
      name: "Youssef Zaki",
      email: "youssef@example.com",
      role: "User",
      status: "Banned",
      joined: "2024-03-20",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

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
                <Icon.SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by username or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">{user.name}</span>
                  <span className="text-muted-foreground flex items-center gap-1 text-xs">
                    <Icon.MailIcon className="h-3 w-3" />
                    {user.email}
                  </span>
                </div>
              </TableCell>
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
                      <Icon.EditIcon className="text-primary h-4 w-4" /> Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.ShieldIcon className="h-4 w-4 text-orange-500" /> Change Role
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
        </TableBody>
      </Table>
    </div>
  );
}
