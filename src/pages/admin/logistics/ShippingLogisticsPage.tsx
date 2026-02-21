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
import { Icon } from "@/assets/icon/icons";

interface Shipment {
  id: string;
  carrier: string;
  tracking: string;
  destination: string;
  status: string;
  eta: string;
}

export default function ShippingLogisticsPage() {
  const [search, setSearch] = useState("");

  const shipments: Shipment[] = [
    {
      id: "SHP-7721",
      carrier: "FedEx",
      tracking: "FX-1029384",
      destination: "New York, USA",
      status: "In Transit",
      eta: "2024-03-25",
    },
    {
      id: "SHP-9902",
      carrier: "DHL Express",
      tracking: "DH-4493021",
      destination: "London, UK",
      status: "Delivered",
      eta: "2024-03-20",
    },
    {
      id: "SHP-1283",
      carrier: "UPS",
      tracking: "UP-8827364",
      destination: "Berlin, DE",
      status: "Pending Pickup",
      eta: "2024-03-26",
    },
    {
      id: "SHP-5564",
      carrier: "BlueDart",
      tracking: "BD-1122334",
      destination: "Mumbai, IN",
      status: "Shipped",
      eta: "2024-03-22",
    },
    {
      id: "SHP-3341",
      carrier: "FedEx",
      tracking: "FX-5566778",
      destination: "Tokyo, JP",
      status: "Delayed",
      eta: "2024-03-28",
    },
  ];

  const filteredShipments = shipments.filter(
    (shp) =>
      shp.id.toLowerCase().includes(search.toLowerCase()) ||
      shp.tracking.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6">
      <ShippingLogisticsHeader />
      <ShippingLogisticsStats />
      <ShippingLogisticsToolbar search={search} setSearch={setSearch} />
      <ShippingLogisticsTable shipments={filteredShipments} />
    </div>
  );
}

function ShippingLogisticsHeader() {
  return (
    <PageHead>
      <PageHeadRow>
        <TopHeadMeta />
        <PageHeadActions responsive="col" align="end">
          <Button className="flex items-center gap-2">
            <Icon.TruckIcon className="h-4 w-4" />
            Manage Carriers
          </Button>
        </PageHeadActions>
      </PageHeadRow>
    </PageHead>
  );
}

function ShippingLogisticsStats() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        icon={Icon.PackageIcon}
        iconColor="text-primary"
        title="Active Shipments"
        value="128"
      />
      <StatCard
        icon={Icon.ClockIcon}
        iconColor="text-amber-500"
        title="Average Lead Time"
        value="3.2 Days"
      />
      <StatCard
        icon={Icon.CheckCircleIcon}
        iconColor="text-emerald-500"
        title="Delivery Success"
        value="99.4%"
      />
      <StatCard
        icon={Icon.NavigationIcon}
        iconColor="text-blue-500"
        title="Carrier Hubs"
        value="12"
      />
    </div>
  );
}

function StatCard({ icon: IconComponent, iconColor, title, value }: any) {
  return (
    <div className="bg-card rounded-xl border p-4 shadow-xs">
      <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
        <IconComponent className={cn("h-4 w-4", iconColor)} /> {title}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  PageHead,
  PageHeadActions,
  PageHeadRow,
} from "@/components/ui/head-page";
import { TopHeadMeta } from "@/components/common/meta";

function ShippingLogisticsToolbar({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="relative w-full md:w-96">
        <Icon.SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search by Shipment ID or Tracking Number..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}

function ShippingLogisticsTable({ shipments }: { shipments: Shipment[] }) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-xs">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[150px]">Shipment ID</TableHead>
            <TableHead>Carrier</TableHead>
            <TableHead>Tracking Number</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Est. Arrival</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shipments.map((shp) => (
            <ShipmentRow key={shp.id} shipment={shp} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ShipmentRow({ shipment }: { shipment: Shipment }) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell className="font-bold">{shipment.id}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{shipment.carrier}</span>
        </div>
      </TableCell>
      <TableCell>
        <code className="bg-muted rounded border px-1.5 py-0.5 font-mono text-xs">
          {shipment.tracking}
        </code>
      </TableCell>
      <TableCell>
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <Icon.MapPinIcon className="h-3.5 w-3.5" />
          {shipment.destination}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            shipment.status === "Delivered"
              ? "success"
              : shipment.status === "In Transit"
                ? "info"
                : shipment.status === "Pending Pickup"
                  ? "pending"
                  : shipment.status === "Delayed"
                    ? "destructive"
                    : "secondary"
          }
        >
          {shipment.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1.5 text-xs">
          <Icon.CalendarIcon className="text-muted-foreground h-3.5 w-3.5" />
          {shipment.eta}
        </div>
      </TableCell>
      <TableCell className="text-right">
        <ShipmentActions />
      </TableCell>
    </TableRow>
  );
}

function ShipmentActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon.MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Logistics</DropdownMenuLabel>
        <DropdownMenuItem className="focus:text-primary flex items-center gap-2">
          <Icon.NavigationIcon className="h-4 w-4" /> Live Tracking
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Icon.ExternalLinkIcon className="h-4 w-4" /> Carrier Site
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive flex items-center gap-2">
          Report Issue
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
