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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Search,
  FileText,
  Download,
  Printer,
  Eye,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const invoices = [
    {
      id: "INV-001",
      customer: "John Doe",
      date: "2024-03-20",
      amount: "$450.00",
      status: "Paid",
      method: "Credit Card",
    },
    {
      id: "INV-002",
      customer: "Jane Smith",
      date: "2024-03-21",
      amount: "$1,200.00",
      status: "Pending",
      method: "Bank Transfer",
    },
    {
      id: "INV-003",
      customer: "Acme Corp",
      date: "2024-03-22",
      amount: "$890.00",
      status: "Overdue",
      method: "PayPal",
    },
    {
      id: "INV-004",
      customer: "Sarah Wilson",
      date: "2024-03-23",
      amount: "$124.50",
      status: "Paid",
      method: "Apple Pay",
    },
    {
      id: "INV-005",
      customer: "Tech Solutions",
      date: "2024-03-24",
      amount: "$2,400.00",
      status: "Refunded",
      method: "Credit Card",
    },
  ];

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Billing & Invoices
          </h1>
          <p className="text-muted-foreground italic">
            Manage your customer billing cycles and financial records.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4" /> Total Revenue
          </div>
          <div className="text-2xl font-bold">$42,560.00</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
            <ArrowUpRight className="h-3 w-3" /> +12.5% vs last month
          </div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <FileText className="h-4 w-4 text-amber-500" /> Pending Invoices
          </div>
          <div className="text-2xl font-bold">14</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Awaiting payment confirmation
          </div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <CreditCard className="h-4 w-4 text-blue-500" /> Average Ticket
          </div>
          <div className="text-2xl font-bold">$184.20</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Across all successful transactions
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search invoice number or customer..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[150px]">Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow
                key={inv.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-mono font-bold">{inv.id}</TableCell>
                <TableCell>
                  <span className="font-medium">{inv.customer}</span>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {inv.date}
                </TableCell>
                <TableCell className="font-semibold">{inv.amount}</TableCell>
                <TableCell>
                  <span className="bg-muted rounded-full px-2 py-1 text-xs">
                    {inv.method}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      inv.status === "Paid"
                        ? "success"
                        : inv.status === "Pending"
                          ? "warning"
                          : inv.status === "Overdue"
                            ? "destructive"
                            : "secondary"
                    }
                  >
                    {inv.status}
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
                      <DropdownMenuLabel>Billing Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Download className="h-4 w-4" /> Download PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-primary flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Print Invoice
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
