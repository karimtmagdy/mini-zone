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

import {
  PageHead,
  PageHeadActions,
  PageHeadGroup,
  PageHeadRow,
  PageHeadTitle,
  PageHeadDescription,
} from "@/components/ui/head-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/assets/icon/icons";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const categories = [
    {
      id: "1",
      name: "Electronics",
      slug: "electronics",
      products: 156,
      status: "Active",
    },
    {
      id: "2",
      name: "Fashion",
      slug: "fashion",
      products: 240,
      status: "Active",
    },
    {
      id: "3",
      name: "Home & Garden",
      slug: "home-garden",
      products: 89,
      status: "Active",
    },
    {
      id: "4",
      name: "Beauty",
      slug: "beauty",
      products: 112,
      status: "Inactive",
    },
    { id: "5", name: "Sports", slug: "sports", products: 67, status: "Active" },
  ];

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHead>
        <PageHeadRow>
          <PageHeadGroup>
            <PageHeadTitle>Categories</PageHeadTitle>
            <PageHeadDescription>
              Organize your products into logical groups and hierarchies.
            </PageHeadDescription>
          </PageHeadGroup>
          <PageHeadActions>
            <Button className="flex items-center gap-2">
              <Icon.FolderPlusIcon className="h-4 w-4" />
              Add Category
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
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </PageHeadActions>
      </PageHead>
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[300px]">Category Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCategories.map((category) => (
            <TableRow
              key={category.id}
              className="hover:bg-muted/30 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary border-primary/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border">
                    <Icon.LayersIcon className="h-5 w-5" />
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="truncate font-semibold">
                      {category.name}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      ID: {category.id}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                  /{category.slug}
                </code>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Icon.PackageIcon className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm font-medium">
                    {category.products}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    category.status === "Active" ? "secondary" : "outline"
                  }
                  className={
                    category.status === "Active"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                      : ""
                  }
                >
                  {category.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Icon.MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Category Options</DropdownMenuLabel>
                    <DropdownMenuItem className="focus:text-primary flex items-center gap-2">
                      <Icon.EyeIcon className="h-4 w-4" /> View Products
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.EditIcon className="h-4 w-4" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                      <Icon.Trash2Icon className="h-4 w-4" /> Delete
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
