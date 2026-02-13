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


export default function ShippingLogisticsPage() {
  const [search, setSearch] = useState("");

  const shipments = [
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
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Shipping & Logistics
          </h1>
          <p className="text-muted-foreground italic">
            Monitor carrier performance and real-time order tracking.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Icon.TruckIcon className="h-4 w-4" />
          Manage Carriers
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.PackageIcon className="text-primary h-4 w-4" /> Active Shipments
          </div>
          <div className="text-2xl font-bold">128</div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.ClockIcon className="h-4 w-4 text-amber-500" /> Average Lead Time
          </div>
          <div className="text-2xl font-bold">3.2 Days</div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.CheckCircleIcon className="h-4 w-4 text-emerald-500" /> Delivery
            Success
          </div>
          <div className="text-2xl font-bold">99.4%</div>
        </div>
        <div className="bg-card rounded-xl border p-4 shadow-xs">
          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon.NavigationIcon className="h-4 w-4 text-blue-500" /> Carrier Hubs
          </div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>

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
            {filteredShipments.map((shp) => (
              <TableRow
                key={shp.id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-bold">{shp.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{shp.carrier}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <code className="bg-muted rounded border px-1.5 py-0.5 font-mono text-xs">
                    {shp.tracking}
                  </code>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <Icon.MapPinIcon className="h-3.5 w-3.5" />
                    {shp.destination}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      shp.status === "Delivered"
                        ? "success"
                        : shp.status === "In Transit"
                          ? "info"
                          : shp.status === "Pending Pickup"
                            ? "pending"
                            : shp.status === "Delayed"
                              ? "destructive"
                              : "secondary"
                    }
                  >
                    {shp.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon.CalendarIcon className="text-muted-foreground h-3.5 w-3.5" />
                    {shp.eta}
                  </div>
                </TableCell>
                <TableCell className="text-right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
