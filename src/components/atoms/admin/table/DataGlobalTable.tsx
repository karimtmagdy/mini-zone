import { Table } from "@/components/ui/table";
import { DataTableRowHeader } from "./DataTableRowHeader";
import { DataTableRowBody } from "./DataTableRowBody";
import { DataPaginationTable } from "./DataPaginationTable";
import type { DataGlobalTableProps } from "@/contract/table.dto";

export function DataGlobalTable<T>({
  table,
  query,
  name,
}: DataGlobalTableProps<T>) {
  return (
    <section>
      <Table>
        <DataTableRowHeader table={table} />
        <DataTableRowBody
          table={table}
          loading={query.isFetching}
          name={name}
        />
      </Table>
      <DataPaginationTable table={table} />
    </section>
  );
}
