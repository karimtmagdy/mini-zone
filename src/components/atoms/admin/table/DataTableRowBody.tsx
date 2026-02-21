import { flexRender } from "@tanstack/react-table";
import { TableCell, TableRow, TableBody } from "@/components/ui/table";
import { NoResultsFound } from "./NoResultsFound";
import type { DataTableBodyProps } from "@/contract/table.dto";

export function DataTableRowBody<T>({
  table,
  loading,
  name,
}: DataTableBodyProps<T>) {
  return (
    <TableBody
      className={
        loading ? "opacity-50 transition-opacity" : "transition-opacity"
      }
    >
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
        <NoResultsFound loading={loading} name={name} table={table} />
      )}
    </TableBody>
  );
}
