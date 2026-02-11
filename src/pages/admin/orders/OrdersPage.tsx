import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  FileText,
  Truck,
  User,
  Trash2,
  Eye,
  Filter,
  Download,
  Calendar,
} from "lucide-react";

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "ORD-7234",
      customer: "Amr Khaled",
      date: "2024-03-24",
      total: 299.0,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-8123",
      customer: "Nour El-Din",
      date: "2024-03-24",
      total: 125.5,
      status: "Processing",
      items: 1,
    },
    {
      id: "ORD-9456",
      customer: "Heba Salah",
      date: "2024-03-23",
      total: 450.0,
      status: "Shipped",
      items: 5,
    },
    {
      id: "ORD-3210",
      customer: "Omar Farouk",
      date: "2024-03-23",
      total: 89.99,
      status: "Pending",
      items: 2,
    },
    {
      id: "ORD-5678",
      customer: "Yasmine Adel",
      date: "2024-03-22",
      total: 540.25,
      status: "Cancelled",
      items: 4,
    },
  ];

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground italic">
            Monitor and manage customer orders and fulfillment status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            View Calendar
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by order ID or customer..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="text-primary font-mono font-bold">
                  {order.id}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="text-muted-foreground h-3.5 w-3.5" />
                    <span className="text-sm font-medium">
                      {order.customer}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {order.date}
                </TableCell>
                <TableCell className="font-semibold">
                  ${order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge variant="ghost" className="bg-muted">
                    {order.items} items
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "secondary"
                        : order.status === "Pending"
                          ? "outline"
                          : order.status === "Cancelled"
                            ? "destructive"
                            : "default"
                    }
                    className={
                      order.status === "Delivered"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Order Options</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Generate Invoice
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-primary flex items-center gap-2">
                        <Truck className="h-4 w-4" /> Update Status
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Delete Record
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
