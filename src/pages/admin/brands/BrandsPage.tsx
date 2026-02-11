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
  Award,
  Plus,
  Package,
  Trash2,
  Edit,
  Globe,
  ExternalLink,
} from "lucide-react";

export default function BrandsPage() {
  const [search, setSearch] = useState("");

  const brands = [
    {
      id: "1",
      name: "TechNova",
      website: "technova.com",
      products: 42,
      status: "Active",
    },
    {
      id: "2",
      name: "AeroStyle",
      website: "aerostyle.io",
      products: 128,
      status: "Active",
    },
    {
      id: "3",
      name: "EcoLuxe",
      website: "ecoluxe.org",
      products: 15,
      status: "Inactive",
    },
    {
      id: "4",
      name: "SwiftGear",
      website: "swiftgear.net",
      products: 89,
      status: "Active",
    },
    {
      id: "5",
      name: "Zenith",
      website: "zenith-audio.com",
      products: 34,
      status: "Active",
    },
  ];

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Partners</h1>
          <p className="text-muted-foreground italic">
            Manage your brand relationships and their product catalogs.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Register New Brand
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search brands..."
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
              <TableHead className="w-[300px]">Brand</TableHead>
              <TableHead>Official Website</TableHead>
              <TableHead>Products Count</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBrands.map((brand) => (
              <TableRow
                key={brand.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-semibold">
                        {brand.name}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        ID: {brand.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <a
                    href={`https://${brand.website}`}
                    target="_blank"
                    className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" />
                    {brand.website}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Package className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm font-medium">
                      {brand.products} items
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      brand.status === "Active" ? "secondary" : "outline"
                    }
                    className={
                      brand.status === "Active"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }
                  >
                    {brand.status}
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
                      <DropdownMenuLabel>Brand Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        View Catalog
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Archive
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
