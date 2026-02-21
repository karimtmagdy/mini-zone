import type { ColumnDef } from "@tanstack/react-table";
import type { BrandDto } from "@/contract/brand.dto";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/assets/icon/icons";
import { DataTableCellViewer } from "@/components/atoms/admin/table";
import {
  CreatedAtColumn,
  UpdatedAtColumn,
  ActionsColumn,
  SelectColumn,
} from "@/lib/columns";
export const brandColumns: ColumnDef<BrandDto>[] = [
  SelectColumn<BrandDto>(),
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="name" />;
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const slug = row.original.slug;
      return (
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            {slug}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="status" />;
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === "active"
              ? "default"
              : status === "archived"
                ? "destructive"
                : "secondary"
          }
        >
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
    accessorKey: "products",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="products" />;
    },
    cell: ({ row }) => {
      const products = row.original.productsCount;
      return (
        <div className="flex items-center gap-2">
          <Icon.BoxIcon />
          <span>{products}</span>items
        </div>
      );
    },
  },
  CreatedAtColumn<BrandDto>({
    getCreatedAt: (row) => row.createdAt,
  }),
  UpdatedAtColumn<BrandDto>({
    getCreatedAt: (row) => row.createdAt,
    getUpdatedAt: (row) => row.updatedAt,
  }),
  ActionsColumn<BrandDto>(),
];
