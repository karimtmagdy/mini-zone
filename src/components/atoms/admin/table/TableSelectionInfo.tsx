import type { DefTableProps } from "@/contract/table.dto";

export function TableSelectionInfo<T>({ table }: DefTableProps<T>) {
  const total = table.getRowCount();
  const selected = Object.keys(table.getState().rowSelection).length;
  return (
    <div className="text-muted-foreground @lg:wrap-balance hidden flex-1 items-center gap-2 text-sm select-none lg:flex">
      <span>
        {selected} of {total} row(s) selected.
      </span>
    </div>
  );
}

/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */

/* {Object.keys(table.getState().rowSelection).length} of{" "}
{Object.keys(table.getState().rowSelection).length} row(s) selected. */
