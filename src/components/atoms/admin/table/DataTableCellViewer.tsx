import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/assets/icon/icons";
import { cn } from "@/lib/utils";
import type { TableCellViewerProps } from "@/contract/table.dto";

export function DataTableCellViewer<T, TV>({
  column,
  title,
  className,
}: TableCellViewerProps<T, TV>) {
  const sortDirection = column.getIsSorted();

  if (!column.getCanSort()) {
    return <div>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3"
            onClick={() => {
              if (column.getCanSort()) {
                column.toggleSorting(column.getIsSorted() === "asc");
              }
            }}
          >
            <span className="text-xs font-bold tracking-wider capitalize">
              {title}
            </span>
            <div className="border-muted-foreground/20 ml-2 border-l pl-2">
              {sortDirection === "desc" ? (
                <Icon.ArrowDownIcon className="text-primary" />
              ) : sortDirection === "asc" ? (
                <Icon.ArrowUpIcon className="text-primary" />
              ) : (
                <Icon.ArrowUpDownIcon className="opacity-30" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <Icon.ArrowUpIcon />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <Icon.ArrowDownIcon />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <Icon.EyeOffIcon />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
