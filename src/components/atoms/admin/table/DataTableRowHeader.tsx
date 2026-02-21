import { flexRender } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import type { DefTableProps } from "@/contract/table.dto";

export function DataTableRowHeader<TData>({ table }: DefTableProps<TData>) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((hg) => (
        <TableRow key={hg.id}>
          {hg.headers.map((h) => (
            <TableHead key={h.id}>
              {h.isPlaceholder
                ? null
                : flexRender(h.column.columnDef.header, h.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
