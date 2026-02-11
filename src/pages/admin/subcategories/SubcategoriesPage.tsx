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
  Columns,
  PlusCircle,
  Package,
  Trash2,
  Edit,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function SubcategoriesPage() {
  const [search, setSearch] = useState("");

  const subcategories = [
    {
      id: "1",
      name: "Smartphones",
      parent: "Electronics",
      slug: "electronics/smartphones",
      products: 64,
      status: "Active",
    },
    {
      id: "2",
      name: "Laptops",
      parent: "Electronics",
      slug: "electronics/laptops",
      products: 48,
      status: "Active",
    },
    {
      id: "3",
      name: "T-Shirts",
      parent: "Fashion",
      slug: "fashion/t-shirts",
      products: 120,
      status: "Active",
    },
    {
      id: "4",
      name: "Guitars",
      parent: "Music",
      slug: "music/guitars",
      products: 12,
      status: "Inactive",
    },
    {
      id: "5",
      name: "Sneakers",
      parent: "Fashion",
      slug: "fashion/sneakers",
      products: 85,
      status: "Active",
    },
  ];

  const filteredSubcategories = subcategories.filter(
    (sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.parent.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subcategories</h1>
          <p className="text-muted-foreground italic">
            Define granular product groupings within your main categories.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Subcategory
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search subcategories or parents..."
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
              <TableHead className="w-[250px]">Subcategory</TableHead>
              <TableHead>Parent Category</TableHead>
              <TableHead>Path Slug</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubcategories.map((sub) => (
              <TableRow
                key={sub.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md border">
                      <Columns className="text-muted-foreground h-4 w-4" />
                    </div>
                    <span className="font-semibold">{sub.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="text-muted-foreground">{sub.parent}</span>
                    <ChevronRight className="text-muted-foreground/50 h-3 w-3" />
                    <span>{sub.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted/50 rounded border px-1.5 py-0.5 text-xs">
                    {sub.slug}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-sm">{sub.products}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={sub.status === "Active" ? "secondary" : "outline"}
                    className={
                      sub.status === "Active"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }
                  >
                    {sub.status}
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
                      <DropdownMenuLabel>Management</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" /> View Frontend
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
