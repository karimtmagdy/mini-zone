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
// import {
//   PageHeadActions,
//   PageHeadRow,
//   PageHeadTitle,
//   PageHeadDescription,
// } from "@/components/ui/head-page";

interface Invoice {
  id: string;
  customer: string;
  date: string;
  amount: string;
  method: string;
  status: string;
}

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.customer.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <InvoicesHeader />
      <InvoicesStats />
      <InvoicesToolbar search={search} setSearch={setSearch} />
      <InvoicesTable invoices={filteredInvoices} />
    </div>
  );
}

function InvoicesHeader() {
  return (<></>
    // <PageHeadRow responsive align="between">
    //   <article>
    //     <PageHeadTitle>Billing & Invoices</PageHeadTitle>
    //     <PageHeadDescription>
    //       Manage your customer billing cycles and financial records.
    //     </PageHeadDescription>
    //   </article>
    //   <PageHeadActions>
    //     <Button variant="outline">
    //       <Icon.DownloadIcon className="h-4 w-4" />
    //       Export CSV
    //     </Button>
    //     <Button>
    //       <Icon.FileTextIcon className="h-4 w-4" />
    //       Create Invoice
    //     </Button>
    //   </PageHeadActions>
    // </PageHeadRow>
  );
}

function InvoicesStats() {
  return (
    <div className="grid gap-4 @md:grid-cols-3">
      <StatCard 
        icon={Icon.CreditCardIcon} 
        title="Total Revenue" 
        value="$42,560.00" 
        trend="+12.5% vs last month"
        trendIcon={Icon.ArrowUpRightIcon}
      />
      <StatCard 
        icon={Icon.FileTextIcon} 
        iconColor="text-amber-500"
        title="Pending Invoices" 
        value="14" 
        description="Awaiting payment confirmation"
      />
      <StatCard 
        icon={Icon.CreditCardIcon} 
        iconColor="text-blue-500"
        title="Average Ticket" 
        value="$184.20" 
        description="Across all successful transactions"
      />
    </div>
  );
}

function StatCard({ icon: IconComponent, iconColor, title, value, trend, trendIcon: TrendIcon, description }: any) {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-xs">
      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
        <IconComponent className={cn("h-4 w-4", iconColor)} /> {title}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className="mt-1 flex items-center gap-1 text-xs text-emerald-500">
          {TrendIcon && <TrendIcon className="h-3 w-3" />} {trend}
        </div>
      )}
      {description && (
        <div className="text-muted-foreground mt-1 text-xs">
          {description}
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

function InvoicesToolbar({ search, setSearch }: { search: string, setSearch: (v: string) => void }) {
  return (
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
  );
}

function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  return (
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
          {invoices.map((inv) => (
            <InvoiceRow key={inv.id} invoice={inv} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function InvoiceRow({ invoice }: { invoice: Invoice }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="font-mono font-bold">{invoice.id}</TableCell>
      <TableCell>
        <span className="font-medium">{invoice.customer}</span>
      </TableCell>
      <TableCell className="text-muted-foreground text-sm">
        {invoice.date}
      </TableCell>
      <TableCell className="font-semibold">{invoice.amount}</TableCell>
      <TableCell>
        <span className="bg-muted rounded-full px-2 py-1 text-xs">
          {invoice.method}
        </span>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            invoice.status === "Paid"
              ? "success"
              : invoice.status === "Pending"
                ? "warning"
                : invoice.status === "Overdue"
                  ? "destructive"
                  : "secondary"
          }
        >
          {invoice.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right">
        <InvoiceActions />
      </TableCell>
    </TableRow>
  );
}

function InvoiceActions() {
  return (
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
  );
}

