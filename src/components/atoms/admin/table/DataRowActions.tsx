import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useClipboard } from "@/hooks/use-clipboard";
import type { TableRowProps } from "@/contract/table.dto";
export function DataRowActions<T>({ row, table }: TableRowProps<T>) {
  const { copy } = useClipboard();
  const rows = row.original as any;
  const paramId = rows.id;
  const meta = table.options.meta as any;

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <Icon.MoreHorizontalIcon />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuLabel>Manage</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => meta?.onView?.(paramId)}>
            <Icon.EyeIcon /> View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => meta?.onEdit?.(paramId)}>
            <Icon.EditIcon /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => copy(paramId)}>
            <Icon.CopyIcon /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(event) => {
              event.preventDefault();
              if (paramId) {
                setTimeout(() => {
                  meta?.onDelete?.(paramId);
                }, 100);
              }
            }}
          >
            <Icon.Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// className="text-destructive focus:bg-destructive/10 focus:text-destructive"
