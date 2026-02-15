import { Table } from "@/components/ui/table";
import DataTableRowHeader from "./DataTableRowHeader";
import DataTableRowBody from "./DataTableRowBody";
import DataPaginationTable from "./DataPaginationTable";
import { type Table as TableStack } from "@tanstack/react-table";
import type { UseQueryResult } from "@tanstack/react-query";

export default function DataGlobalTable<TData>({
  table,
  query,
  name,
}: {
  table: TableStack<TData>;
  query: UseQueryResult<any, Error>;
  name: string;
}) {
  return (
    <section>
      <Table>
        <DataTableRowHeader table={table} />
        <DataTableRowBody
          table={table}
          isLoading={query.isFetching}
          name={name}
        />
      </Table>
      <DataPaginationTable table={table} />
    </section>
  );
}
