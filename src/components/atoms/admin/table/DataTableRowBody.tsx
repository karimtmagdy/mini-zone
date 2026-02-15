import { flexRender, type Table } from "@tanstack/react-table";
import { TableCell, TableRow, TableBody } from "@/components/ui/table";
import NoResultsFound from "./NoResultsFound";

interface DataTableRowBodyProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  name: string;
}

export default function DataTableRowBody<TData>({
  table,
  isLoading,
  name,
}: DataTableRowBodyProps<TData>) {
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <NoResultsFound loading={isLoading} name={name} table={table} />
      )}
    </TableBody>
  );
}
