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
  Ticket,
  Calendar,
  Trash2,
  Edit,
  PlusCircle,
  Percent,
} from "lucide-react";

export default function CouponsPage() {
  const [search, setSearch] = useState("");

  const coupons = [
    {
      id: "1",
      code: "WELCOME20",
      discount: "20%",
      type: "Percentage",
      expiry: "2024-12-31",
      status: "Active",
      usage: "1,204",
    },
    {
      id: "2",
      code: "SUMMER25OFF",
      discount: "$25.00",
      type: "Fixed Amount",
      expiry: "2024-08-31",
      status: "Active",
      usage: "450",
    },
    {
      id: "3",
      code: "FLASH50",
      discount: "50%",
      type: "Percentage",
      expiry: "2024-03-20",
      status: "Expired",
      usage: "8,900",
    },
    {
      id: "4",
      code: "BFRIDAY",
      discount: "30%",
      type: "Percentage",
      expiry: "2024-11-28",
      status: "Scheduled",
      usage: "0",
    },
  ];

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Promotions & Coupons
          </h1>
          <p className="text-muted-foreground italic">
            Create and track discount codes and marketing promotions.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Coupon
        </Button>
      </div>

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search by coupon code..."
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
              <TableHead className="w-[200px]">Coupon Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Usage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCoupons.map((coupon) => (
              <TableRow
                key={coupon.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Ticket className="text-primary h-4 w-4" />
                    <span className="font-mono text-base font-bold">
                      {coupon.code}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 font-semibold text-emerald-600">
                    <Percent className="h-3 w-3" />
                    {coupon.discount}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {coupon.type}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="text-muted-foreground h-3.5 w-3.5" />
                    {coupon.expiry}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      coupon.status === "Active"
                        ? "secondary"
                        : coupon.status === "Scheduled"
                          ? "outline"
                          : "destructive"
                    }
                    className={
                      coupon.status === "Active"
                        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                        : ""
                    }
                  >
                    {coupon.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {coupon.usage}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Coupon Options</DropdownMenuLabel>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-primary flex items-center gap-2">
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                        <Trash2 className="h-4 w-4" /> Deactivate
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
