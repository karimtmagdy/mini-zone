import { type ColumnDef } from "@tanstack/react-table";
import { DataRowActions } from "@/components/atoms/admin/table";

export default function ActionsColumn<TData>(): ColumnDef<TData> {
  return {
    accessorKey: "actions",
    id: "actions",
    header: () => <span>Actions</span>,
    cell: ({ row, table }) => {
      return <DataRowActions row={row} table={table} />;
    },
  };
}
// {
//   accessorKey: "status",
//   header: ({ column }) => {
//     return <DataTableCellViewer column={column} title="status" />;
//   },
//   cell: ({ row }) => {
//     const status = row.original.status;
//     return (
//       <Badge
//         variant={
//           status === "active"
//             ? "default"
//             : status === "archived"
//               ? "destructive"
//               : "secondary"
//         }
//       >
//         {status}
//       </Badge>
//     );
//   },
//   enableColumnFilter: true,
//   filterFn: (row, id, filterValue) => {
//     if (!filterValue.length) return true;
//     return filterValue.includes(row.getValue(id));
//   },
// },
