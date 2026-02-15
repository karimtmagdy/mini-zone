import { TableCell, TableRow } from "@/components/ui/table";
import type { Table } from "@tanstack/react-table";
import { Icon } from "@/assets/icon/icons";
export default function NoResultsFound<TData>({
  loading,
  name,
  table,
}: {
  loading: boolean;
  name: string;
  table: Table<TData>;
}) {
  return (
    <TableRow className="overflow-hidden select-none hover:bg-transparent">
      <TableCell
        colSpan={table.getHeaderGroups()[0].headers.length}
        className="h-24 py-8 text-center"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Icon.RefreshCwIcon className="animate-spin" />
            loading {name}...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            No {name} results.
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
