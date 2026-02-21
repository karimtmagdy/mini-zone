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
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/assets/icon/icons";
import { TopHeadMeta } from "@/components/common/meta";
import {
  PageHead,
  PageHeadRow,
  PageHeadActions,
} from "@/components/ui/head-page";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Calendar } from "@/components/ui/calendar";

interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const orders: Order[] = [
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
      <OrdersToolbar search={search} setSearch={setSearch} />
      <OrdersTable orders={filteredOrders} />
    </div>
  );
}

interface OrdersToolbarProps {
  search: string;
  setSearch: (value: string) => void;
}

function OrdersToolbar({ search, setSearch }: OrdersToolbarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <PageHead>
      <PageHeadRow>
        <TopHeadMeta />
        <PageHeadActions>
          <Button variant="outline">
            <Icon.DownloadIcon />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Icon.CalendarIcon />
                View Calendar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="bg-background w-full"
            >
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </DropdownMenuContent>
          </DropdownMenu>
        </PageHeadActions>
      </PageHeadRow>
      <PageHeadRow>
        <PageHeadActions>
          <InputGroup className="w-full @lg:w-sm">
            <InputGroupAddon>
              <InputGroupButton size="icon-xs">
                <Icon.SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by order ID or customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </PageHeadActions>
        <PageHeadActions>
          <Button variant="outline">
            <Icon.FilterIcon />
            More Filters
          </Button>
        </PageHeadActions>
      </PageHeadRow>
    </PageHead>
  );
}

function OrdersTable({ orders }: { orders: Order[] }) {
  return (
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
        {orders.map((order) => (
          <OrderRow key={order.id} order={order} />
        ))}
      </TableBody>
    </Table>
  );
}

function OrderRow({ order }: { order: Order }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="text-primary font-mono font-bold">
        {order.id}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Icon.UserIcon className="text-muted-foreground h-3.5 w-3.5" />
          <span className="text-sm font-medium">{order.customer}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {order.date}
      </TableCell>
      <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
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
        <OrderActions />
      </TableCell>
    </TableRow>
  );
}

function OrderActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon.MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Order Options</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.EyeIcon className="h-4 w-4" /> View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.FileTextIcon className="h-4 w-4" /> Generate Invoice
        </DropdownMenuItem>
        <DropdownMenuItem className="text-primary flex items-center gap-2">
          <Icon.TruckIcon className="h-4 w-4" /> Update Status
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
          <Icon.Trash2Icon className="h-4 w-4" /> Delete Record
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
