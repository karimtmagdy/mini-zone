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
  PackagePlus,
  Tag,
  Layers,
  Trash2,
  Edit,
  Filter,
  Eye,
  ArrowUpDown,
} from "lucide-react";

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const products = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: 199.99,
      stock: 45,
      status: "In Stock",
    },
    {
      id: "2",
      name: "Modern Office Chair",
      category: "Furniture",
      price: 249.5,
      stock: 12,
      status: "Low Stock",
    },
    {
      id: "3",
      name: "Minimalist Water Bottle",
      category: "Accessories",
      price: 24.0,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "4",
      name: "Smart Watch Series 5",
      category: "Electronics",
      price: 399.0,
      stock: 85,
      status: "In Stock",
    },
    {
      id: "5",
      name: "Leather Travel Wallet",
      category: "Accessories",
      price: 45.99,
      stock: 30,
      status: "In Stock",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Inventory Catalog
          </h1>
          <p className="text-muted-foreground italic">
            Manage your catalog, track stock levels, and update pricing.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PackagePlus className="h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search products by name or category..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow
                key={product.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
                      <Tag className="text-muted-foreground h-5 w-5" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-semibold">
                        {product.name}
                      </span>
                      <span className="text-muted-foreground font-mono text-xs">
                        ID: {product.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Layers className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-sm">{product.category}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  ${product.price.toFixed(2)}
                </TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-semibold ${
                      product.stock <= 15
                        ? "text-orange-500"
                        : "text-foreground"
                    }`}
                  >
                    {product.stock} units
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.status === "In Stock"
                        ? "success"
                        : product.status === "Low Stock"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {product.status}
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
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="text-primary h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-orange-500" /> Edit
                        Product
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
// showing 1 of 1 entries
