import { type ColumnDef } from "@tanstack/react-table";
import { Icon } from "@/assets/icon/icons";
import { DataTableCellViewer } from "@/components/atoms/admin/table";
import { formatRelativeTime, formatShortDate } from "../date";

export interface AtColumnOptions {
  accessorKey?: string;
  title?: string;
  className?: string;
}
interface UpdatedAtColumnOptions<TData> extends AtColumnOptions {
  getCreatedAt: (row: TData) => Date;
  getUpdatedAt: (row: TData) => Date;
}

export default function UpdatedAtColumn<TData>({
  accessorKey = "updatedAt",
  title = "updatedAt",
  className = "hidden @2xl:flex",
  getCreatedAt,
  getUpdatedAt,
}: UpdatedAtColumnOptions<TData>): ColumnDef<TData> {
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
      const updatedAt = getUpdatedAt(row.original);

      if (createdAt === updatedAt) {
        return (
          <small className="text-muted-foreground hidden w-full select-none @2xl:flex @2xl:justify-center">
            --
          </small>
        );
      }

      const date = new Date(updatedAt);
      return (
        <div className="hidden @2xl:flex @2xl:items-center @2xl:gap-2">
          <Icon.CalendarIcon />
          <div className="flex flex-col -space-y-1">
            <span className="text-sm">{formatShortDate(date)}</span>
            <span className="text-muted-foreground text-xs">
              {formatRelativeTime(date)}
            </span>
          </div>
        </div>
      );
    },
    sortingFn: "datetime",
  };
}
