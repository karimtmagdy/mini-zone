import { Button } from "@/components/ui/button";
import { Icon } from "@/assets/icon/icons";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
// import type { UseQueryOptions } from "@tanstack/react-query";

// query: UseQueryOptions<any, Error, any, any, any, any>;
type QueryOptions<T> = {
  className?: string;
  table: Table<T>;
};
export function ToolbarResetData<T>({ table, className }: QueryOptions<T>) {
  return (
    <>
      {(table.getState().columnFilters?.length > 0 ||
        !!table.getState().globalFilter) && (
        <Button
          variant="ghost"
          className={cn("border-dashed", className)}
          onClick={() => {
            table.resetColumnFilters();
            table.resetGlobalFilter();
            table.resetSorting();
            table.resetRowSelection();
            table.resetPagination();
            table.resetColumnVisibility();
          }}
        >
          Reset
          <Icon.XIcon />
        </Button>
      )}
    </>
  );
}
