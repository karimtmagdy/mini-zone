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
// import {
//   PageHeadActions,
//   PageHeadDescription,
//   PageHeadRow,
//   PageHeadTitle,
// } from "@/components/ui/head-page";
import { Icon } from "@/assets/icon/icons";
import { Input } from "@/components/ui/input";

interface Brand {
  id: string;
  name: string;
  website: string;
  products: number;
  status: string;
}

export default function BrandsPage() {
  const [search, setSearch] = useState("");

  const brands: Brand[] = [
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
      <BrandsHeader />
      <BrandsToolbar search={search} setSearch={setSearch} />
      <BrandsTable brands={filteredBrands} />
    </div>
  );
}

function BrandsHeader() {
  return (<></>
    // <PageHeadRow responsive align="between">
    //   <article>
    //     <PageHeadTitle>Brand Partners</PageHeadTitle>
    //     <PageHeadDescription>
    //       Manage your brand relationships and their product catalogs.
    //     </PageHeadDescription>
    //   </article>
    //   <PageHeadActions align="end">
    //     <Button variant="outline" size="sm">
    //       <Icon.XIcon /> Reset
    //     </Button>
    //     <Button size="sm">
    //       <Icon.PlusIcon className="h-4 w-4" /> Create New Brand
    //     </Button>
    //   </PageHeadActions>
    // </PageHeadRow>
  );
}

function BrandsToolbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <PageHeadRow responsive align="between">
      <footer className="footer">
        <Input
          type="text"
          className="@lg:max-w-3xs @xl:w-lg @2xl:max-w-sm"
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </footer>
      <PageHeadActions align="end">
        <Button variant="outline" size="sm">
          <Icon.XIcon /> Reset
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Icon.FilterIcon /> Filter
        </Button>
        <Button variant="outline" size="sm">
          <Icon.DownloadIcon /> Export CSV
        </Button>
      </PageHeadActions>
    </PageHeadRow>
  );
}

function BrandsTable({ brands }: { brands: Brand[] }) {
  return (
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
          {brands.map((brand) => (
            <BrandRow key={brand.id} brand={brand} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function BrandRow({ brand }: { brand: Brand }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600">
            <Icon.AwardIcon className="h-5 w-5" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{brand.name}</span>
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
          <Icon.GlobeIcon className="h-3.5 w-3.5" />
          {brand.website}
          <Icon.ExternalLinkIcon className="h-3 w-3" />
        </a>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Icon.PackageIcon className="text-muted-foreground h-4 w-4" />
          <span className="text-sm font-medium">{brand.products} items</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={brand.status === "Active" ? "secondary" : "outline"}
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
        <BrandActions />
      </TableCell>
    </TableRow>
  );
}

function BrandActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon.MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Brand Actions</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.EditIcon className="h-4 w-4" /> Edit Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          View Catalog
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
          <Icon.Trash2Icon className="h-4 w-4" /> Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

