import type { ColumnDef } from "@tanstack/react-table";
import type { SubCategoryDto } from "@/contract/subcategory.dto";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/assets/icon/icons";
import { DataTableCellViewer } from "@/components/atoms/admin/table";

import {
  CreatedAtColumn,
  UpdatedAtColumn,
  ActionsColumn,
  SelectColumn,
} from "@/lib/columns";
export const subCategoryColumns: ColumnDef<SubCategoryDto>[] = [
  SelectColumn<SubCategoryDto>(),
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
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="category" />;
    },
    cell: ({ row }) => {
      const category = row.original.category;
      if (!category) return <span className="text-muted-foreground">-</span>;

      // Handle both object and array of objects
      const categoryName = Array.isArray(category)
        ? category[0]?.name
        : (category as any).name;

      return <div className="font-semibold">{categoryName || "-"}</div>;
    },
  },

  {
    accessorKey: "products",
    header: ({ column }) => {
      return <DataTableCellViewer column={column} title="products" />;
    },
    cell: ({ row }) => {
      const products = row.original.products;
      return (
        <div className="flex items-center gap-2">
          <Icon.BoxIcon />
          <span>{products}</span>
        </div>
      );
    },
  },
  CreatedAtColumn<SubCategoryDto>({
    getCreatedAt: (row) => row.createdAt,
  }),
  UpdatedAtColumn<SubCategoryDto>({
    getCreatedAt: (row) => row.createdAt,
    getUpdatedAt: (row) => row.updatedAt,
  }),
  ActionsColumn<SubCategoryDto>(),
];
