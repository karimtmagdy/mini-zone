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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  PageHead,
  PageHeadActions,
  PageHeadDescription,
  PageHeadGroup,
  PageHeadRow,
  PageHeadTitle,
} from "@/components/ui/head-page";
import { Icon } from "@/assets/icon/icons";

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
      <PageHead>
        <PageHeadRow>
          <PageHeadGroup>
            <PageHeadTitle>Promotions & Coupons</PageHeadTitle>
            <PageHeadDescription>
              Create and track discount codes and marketing promotions.
            </PageHeadDescription>
          </PageHeadGroup>
          <PageHeadActions>
            <Button className="flex items-center gap-2">
              <Icon.PlusCircleIcon className="h-4 w-4" />
              Create New Coupon
            </Button>
          </PageHeadActions>
        </PageHeadRow>
        <PageHeadActions resource="search" align="between">
          <InputGroup className="w-full @lg:w-sm">
            <InputGroupAddon>
              <InputGroupButton>
                <Icon.SearchIcon />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              placeholder="Search by coupon code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </PageHeadActions>
      </PageHead>
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
                  <Icon.TicketIcon className="text-primary h-4 w-4" />
                  <span className="font-mono text-base font-bold">
                    {coupon.code}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1 font-semibold text-emerald-600">
                  <Icon.PercentIcon className="h-3 w-3" />
                  {coupon.discount}
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {coupon.type}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Icon.CalendarIcon className="text-muted-foreground h-3.5 w-3.5" />
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
                      <Icon.MoreHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Coupon Options</DropdownMenuLabel>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Icon.EditIcon className="h-4 w-4" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-primary flex items-center gap-2">
                      Analytics
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive flex items-center gap-2">
                      <Icon.Trash2Icon className="h-4 w-4" /> Deactivate
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
