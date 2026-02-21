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
  PageHeadRow,
 } from "@/components/ui/head-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TopHeadMeta } from "@/components/common/meta";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const products: Product[] = [
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
      <ProductsToolbar search={search} setSearch={setSearch} />
      <ProductsTable products={filteredProducts} />
    </div>
  );
}

interface ProductsToolbarProps {
  search: string;
  setSearch: (value: string) => void;
}

function ProductsToolbar({ search, setSearch }: ProductsToolbarProps) {
  return (
    <PageHead>
      <PageHeadRow>
        <TopHeadMeta />

        <PageHeadActions>
          <Button>
            <Icon.PackagePlusIcon />
            Add New Product
          </Button>
        </PageHeadActions>
      </PageHeadRow>
      <PageHeadRow responsive align="between">
        <PageHeadActions resource="search" align="between">
          <InputGroup className="w-full @lg:w-sm">
            <InputGroupAddon>
              <InputGroupButton>
                <Icon.SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </PageHeadActions>
        <PageHeadActions>
          <Button variant="outline">
            <Icon.FilterIcon />
            Filter
          </Button>
          <Button variant="outline">
            <Icon.ArrowUpDownIcon />
            Sort
          </Button>
        </PageHeadActions>
      </PageHeadRow>
    </PageHead>
  );
}

function ProductsTable({ products }: { products: Product[] }) {
  return (
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
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
}

function ProductRow({ product }: { product: Product }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
            <Icon.TagIcon className="text-muted-foreground h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{product.name}</span>
            <span className="text-muted-foreground font-mono text-xs">
              ID: {product.id}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Icon.LayersIcon className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-sm">{product.category}</span>
        </div>
      </TableCell>
      <TableCell className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
        ${product.price.toFixed(2)}
      </TableCell>
      <TableCell>
        <span
          className={`text-sm font-semibold ${
            product.stock <= 15 ? "text-orange-500" : "text-foreground"
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
        <ProductActions />
      </TableCell>
    </TableRow>
  );
}

function ProductActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon.MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.EyeIcon className="text-primary h-4 w-4" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.EditIcon className="h-4 w-4 text-orange-500" /> Edit Product
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
          <Icon.Trash2Icon /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// showing 1 of 1 entries
