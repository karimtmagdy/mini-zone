import type { ColumnDef } from "@tanstack/react-table";
import type { AtColumnOptions } from "./updated-at-column";
import { DataTableCellViewer } from "@/components/atoms/admin/table";
import { Icon } from "@/assets/icon/icons";
import { formatShortDate, formatTimestamp } from "../date";

interface CreatedAtColumnOptions<TData> extends AtColumnOptions {
  getCreatedAt: (row: TData) => Date;
}

export default function CreatedAtColumn<TData>({
  accessorKey = "createdAt",
  title = "createdAt",
  className = "hidden @2xl:flex",
  getCreatedAt,
}: CreatedAtColumnOptions<TData>): ColumnDef<TData> {
  return {
    accessorKey,
    header: ({ column }) => (
      <DataTableCellViewer
        column={column}
        title={title}
        className={className}
      />
    ),

    cell: ({ row }) => {
      const createdAt = getCreatedAt(row.original);
      const date = new Date(createdAt);
      return (
        <div className="hidden items-center gap-2 @2xl:flex">
          <Icon.CalendarIcon />
          <div className="flex flex-col -space-y-1">
            <span className="text-sm">{formatShortDate(date)}</span>
            <span className="text-muted-foreground text-xs">
              {formatTimestamp(date, "h:mm a")}
            </span>
          </div>
        </div>
      );
    },
    sortingFn: "datetime",
  };
}
