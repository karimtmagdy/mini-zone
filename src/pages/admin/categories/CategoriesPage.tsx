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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  Layers,
  FolderPlus,
  Package,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";

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
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground italic">
            Organize your products into logical groups and hierarchies.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <FolderPlus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search categories..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-xs">
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
                      <Layers className="h-5 w-5" />
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
                    <Package className="text-muted-foreground h-4 w-4" />
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
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Category Options</DropdownMenuLabel>
                      <DropdownMenuItem className="focus:text-primary flex items-center gap-2">
                        <Eye className="h-4 w-4" /> View Products
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
