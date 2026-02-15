import { flexRender, type Table } from "@tanstack/react-table";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export default function DataTableRowHeader<TData>({ table }: { table: Table<TData> }) {
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
