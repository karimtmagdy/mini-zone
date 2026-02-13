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
import { Icon } from "@/assets/icon/icons";
import { invoices } from "@/core/data/insights-data-invoices";
import {
  PageHead,
  PageHeadActions,
  PageHeadGroup,
  PageHeadRow,
  PageHeadTitle,
  PageHeadDescription,
} from "@/components/ui/head-page";

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHead>
        <PageHeadRow responsive>
          <PageHeadGroup>
            <PageHeadTitle>Billing & Invoices</PageHeadTitle>
            <PageHeadDescription>
              Manage your customer billing cycles and financial records.
            </PageHeadDescription>
          </PageHeadGroup>
          <PageHeadActions>
            <Button variant="outline">
              <Icon.DownloadIcon className="h-4 w-4" />
              Export CSV
            </Button>
            <Button>
              <Icon.FileTextIcon className="h-4 w-4" />
              Create Invoice
            </Button>
          </PageHeadActions>
        </PageHeadRow>
      </PageHead>
      <div className="grid gap-4 @md:grid-cols-3">
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.CreditCardIcon className="h-4 w-4" /> Total Revenue
          </div>
          <div className="text-2xl font-bold">$42,560.00</div>
          <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
            <Icon.ArrowUpRightIcon className="h-3 w-3" /> +12.5% vs last month
          </div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.FileTextIcon className="h-4 w-4 text-amber-500" /> Pending
            Invoices
          </div>
          <div className="text-2xl font-bold">14</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Awaiting payment confirmation
          </div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.CreditCardIcon className="h-4 w-4 text-blue-500" /> Average
            Ticket
          </div>
          <div className="text-2xl font-bold">$184.20</div>
          <div className="text-muted-foreground mt-1 text-xs">
            Across all successful transactions
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Icon.SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search invoice number or customer..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

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
                      <Icon.MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="min-w-40">
                    <DropdownMenuLabel>Billing Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.EyeIcon className="h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.DownloadIcon className="h-4 w-4" /> Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary flex items-center gap-2">
                      <Icon.PrinterIcon className="h-4 w-4" /> Print Invoice
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
