import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertTriangle,
  Package,
  History,
  Navigation,
  ShieldAlert,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapLibre,
  MapMarker,
  MarkerContent,
  MarkerPopup,
} from "@/components/ui/map";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { cn } from "@/lib/utils";

interface OrderDetail {
  id: string;
  name: string;
  amount: string;
  status: string;
  customer: string;
  items: string[];
  timeline: string[];
  note?: string;
}

export default function DashboardPage() {
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);

  const orders: OrderDetail[] = [
    {
      name: "Global Delivery",
      id: "FD-429",
      amount: "$1,999.00",
      status: "Success",
      customer: "Alicia Koch",
      items: ["ExpertBook B9", "RROG Moonstone"],
      timeline: ["Order Placed", "Fulfillment Start", "Delivered"],
    },
    {
      name: "Strategic Bulk",
      id: "FD-310",
      amount: "$12,450.00",
      status: "Critical Issue",
      customer: "William Smith",
      items: ["ROG Maximus Z790 (x10)"],
      timeline: ["Order Placed", "Payment Confirmed", "Stuck at Customs"],
      note: "Documentation mismatch detected in Sector 7",
    },
    {
      name: "Direct Consumer",
      id: "FD-112",
      amount: "$450.00",
      status: "Success",
      customer: "Bob Johnson",
      items: ["AimPoint EVA-02 Edition"],
      timeline: ["Order Placed", "Delivered"],
    },
    {
      name: "Corporate Node",
      id: "FD-098",
      amount: "$3,200.00",
      status: "Success",
      customer: "Emily Davis",
      items: ["ExpertBook B9"],
      timeline: ["Paid", "Processing", "Shipped"],
    },
    {
      name: "Express Fulfillment",
      id: "FD-088",
      amount: "$1,540.00",
      status: "Success",
      customer: "Michael Wilson",
      items: ["ROG Gladius III"],
      timeline: ["Order Placed", "Delivered"],
    },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Users",
      value: "+2350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "Active Now",
      value: "+573",
      change: "-201",
      trend: "down",
      icon: Activity,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 pt-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-1 text-xs">
                  from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="group col-span-4 h-[500px] overflow-hidden shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="font-black italic">
                Global Market Reach
              </CardTitle>
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                Real-time order distribution
              </p>
            </div>
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20"
            >
              Live Intelligence
            </Badge>
          </CardHeader>
          <CardContent className="relative h-full p-0">
            <div className="to-background/20 pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent" />
            <MapLibre
              viewport={{
                center: [0, 20],
                zoom: 1.5,
              }}
              className="contrast-[1.1] grayscale-[0.2]"
            >
              {[
                {
                  name: "New York Hub",
                  lng: -74.006,
                  lat: 40.7128,
                  density: "High",
                },
                {
                  name: "London Sector",
                  lng: -0.1276,
                  lat: 51.5074,
                  density: "Medium",
                },
                {
                  name: "Tokyo Node",
                  lng: 139.6503,
                  lat: 35.6762,
                  density: "Extreme",
                },
                {
                  name: "Dubai Gateway",
                  lng: 55.2708,
                  lat: 25.2048,
                  density: "High",
                },
              ].map((point, i) => (
                <MapMarker key={i} longitude={point.lng} latitude={point.lat}>
                  <MarkerContent>
                    <div className="relative">
                      <div className="bg-primary size-4 animate-pulse rounded-full border-2 border-white shadow-lg" />
                      <div className="bg-primary absolute inset-0 size-4 animate-ping rounded-full opacity-20" />
                    </div>
                  </MarkerContent>
                  <MarkerPopup className="min-w-[120px] p-2">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase">
                      {point.name}
                    </p>
                    <p className="text-sm font-black italic">
                      Density: {point.density}
                    </p>
                  </MarkerPopup>
                </MapMarker>
              ))}
            </MapLibre>
          </CardContent>
        </Card>

        <Card className="col-span-3 h-[500px] shadow-sm">
          <CardHeader>
            <CardTitle className="font-bold italic">
              Top Performing Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  region: "Asia Pacific",
                  growth: "+42%",
                  color: "bg-emerald-500",
                },
                {
                  region: "North America",
                  growth: "+28%",
                  color: "bg-blue-500",
                },
                { region: "Europe", growth: "+15%", color: "bg-indigo-500" },
                {
                  region: "Middle East",
                  growth: "+31%",
                  color: "bg-amber-500",
                },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-end justify-between">
                    <span className="text-sm font-bold">{item.region}</span>
                    <span className="text-muted-foreground text-xs font-black italic">
                      {item.growth}
                    </span>
                  </div>
                  <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-1000",
                        item.color,
                      )}
                      style={{ width: item.growth.replace("+", "") }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 border-primary/10 mt-8 rounded-xl border p-4">
              <p className="text-xs leading-relaxed font-medium italic opacity-80">
                "Market intelligence suggests a 12% increase in consumer
                activity within the Tokyo Node over the next quarter."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-2 transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-black italic">
                Revenue Analytics Stream
              </CardTitle>
              <p className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
                Projected vs Actual performance
              </p>
            </div>
            <div className="flex gap-2">
              {["24H", "7D", "30D"].map((t) => (
                <button
                  key={t}
                  className={cn(
                    "hover:bg-muted rounded-lg border px-3 py-1 text-[10px] font-black transition-all",
                    t === "7D"
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-muted/50 border-border",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                actual: {
                  label: "Actual Revenue",
                  color: "hsl(var(--primary))",
                },
                projected: {
                  label: "Projected",
                  color: "hsl(var(--muted-foreground))",
                },
              }}
              className="mt-4 h-[350px] w-full"
            >
              <AreaChart
                data={[
                  { date: "Oct 20", actual: 4500, projected: 4200 },
                  { date: "Oct 21", actual: 5200, projected: 4800 },
                  { date: "Oct 22", actual: 4800, projected: 5100 },
                  { date: "Oct 23", actual: 6100, projected: 5400 },
                  { date: "Oct 24", actual: 5900, projected: 5800 },
                  { date: "Oct 25", actual: 7200, projected: 6200 },
                  { date: "Oct 26", actual: 8100, projected: 6600 },
                ]}
              >
                <defs>
                  <linearGradient
                    id="actualGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--primary))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  fontFamily="inherit"
                  tickMargin={10}
                  tickFormatter={(v) => v.split(" ")[1]}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  fill="url(#actualGradient)"
                  animationDuration={1500}
                />
                <Area
                  type="monotone"
                  dataKey="projected"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-muted/20 col-span-3 border-dashed transition-all hover:shadow-lg">
          <CardHeader>
            <CardTitle className="font-bold italic">
              Executive Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background group cursor-pointer rounded-2xl border p-4 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-2 flex items-start justify-between">
                <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
                  <TrendingUp className="text-primary size-5" />
                </div>
                <Badge variant="success">+12.4%</Badge>
              </div>
              <h4 className="text-sm font-bold">Growth Velocity</h4>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                System performance is exceeding Q4 projections by a significant
                margin.
              </p>
            </div>

            <div className="bg-background group cursor-pointer rounded-2xl border p-4 shadow-sm transition-transform hover:scale-[1.02]">
              <div className="mb-2 flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10">
                  <Activity className="size-5 text-blue-500" />
                </div>
                <Badge variant="info">Active</Badge>
              </div>
              <h4 className="text-sm font-bold">Operational Pulse</h4>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                All core services are operating at peak efficiency levels.
              </p>
            </div>

            <Card className="bg-primary shadow-primary/20 border-none shadow-xl">
              <CardContent className="text-primary-foreground p-5">
                <h3 className="mb-1 text-lg font-black tracking-tighter uppercase italic">
                  Mini Zone Pro
                </h3>
                <p className="mb-4 text-xs font-medium italic opacity-80">
                  Unlock predictive analytics and deep-market insights today.
                </p>
                <Button
                  variant="secondary"
                  className="h-8 w-full text-[10px] font-black tracking-widest uppercase italic shadow-lg"
                >
                  Upgrade Command Center
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>

      <div className="relative grid gap-6 overflow-hidden pt-4 md:grid-cols-2 lg:grid-cols-7">
        <Card
          className={cn(
            "border-2 shadow-sm transition-all duration-500",
            selectedOrder ? "lg:col-span-4" : "lg:col-span-4",
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-bold italic">
              Recent Fulfillment
            </CardTitle>
            <Button
              variant="ghost"
              className="text-xs font-black uppercase italic underline"
            >
              View All Streams
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orders.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedOrder(item)}
                  className={cn(
                    "group flex cursor-pointer items-center gap-4 rounded-2xl p-2 transition-all",
                    selectedOrder?.id === item.id
                      ? "bg-muted scale-[0.98] shadow-inner"
                      : "hover:bg-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-2xl border font-black italic shadow-sm transition-all",
                      item.status === "Critical Issue"
                        ? "animate-pulse border-rose-600 bg-rose-500 text-white"
                        : "bg-muted group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    {item.id.split("-")[1]}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-none font-bold">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-[10px] font-black tracking-tighter uppercase">
                        ID: {item.id}
                      </p>
                      {item.status === "Critical Issue" && (
                        <span className="flex animate-pulse items-center gap-1 text-[9px] font-black text-rose-600 uppercase italic">
                          <AlertTriangle className="size-3" /> System Anomaly
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-black italic">{item.amount}</div>
                    <Badge
                      variant={
                        item.status === "Success" ? "success" : "destructive"
                      }
                      className="h-4 px-2 text-[8px] font-black uppercase italic shadow-sm"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          {selectedOrder ? (
            <Card className="bg-muted/10 animate-in slide-in-from-right sticky top-4 border-2 shadow-xl duration-500">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-2xl shadow-lg",
                      selectedOrder.status === "Critical Issue"
                        ? "bg-rose-500 text-white"
                        : "bg-primary text-primary-foreground",
                    )}
                  >
                    <Package className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-black italic">
                      Order {selectedOrder.id}
                    </CardTitle>
                    <p className="text-muted-foreground text-[10px] font-black tracking-tighter uppercase italic">
                      Tactical Detail View
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-full"
                >
                  <X className="size-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-8 pt-6">
                {selectedOrder.status === "Critical Issue" && (
                  <div className="animate-pulse rounded-2xl border-2 border-white/20 bg-rose-500 p-4 text-white shadow-lg shadow-rose-500/20">
                    <div className="mb-1 flex items-center gap-2">
                      <ShieldAlert className="size-4" />
                      <h4 className="text-xs font-black tracking-widest text-white uppercase italic">
                        Critical Alert
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed font-medium italic opacity-90">
                      {selectedOrder.note}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-[10px] font-black tracking-tighter uppercase italic">
                      Entity Name
                    </span>
                    <p className="text-sm font-bold">
                      {selectedOrder.customer}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-[10px] font-black tracking-tighter uppercase italic">
                      Fulfillment Node
                    </span>
                    <p className="text-sm font-bold">Sector 7-G</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase italic">
                    <History className="size-3" /> Tactical Audit Trail
                  </div>
                  <div className="ml-1.5 space-y-3 border-l-2 border-dashed pl-4">
                    {selectedOrder.timeline.map((step: string, i: number) => (
                      <div key={i} className="relative">
                        <div className="bg-primary border-background absolute top-1.5 -left-[21px] size-2 rounded-full border-4 shadow-sm" />
                        <p className="text-[11px] font-bold italic">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-muted-foreground flex items-center gap-2 text-[10px] font-black tracking-tighter uppercase italic">
                    <Package className="size-3" /> Manifest Payload
                  </div>
                  <div className="bg-background space-y-2 rounded-2xl border p-3 shadow-inner">
                    {selectedOrder.items.map((item: string, i: number) => (
                      <div
                        key={i}
                        className="bg-muted/40 flex items-center justify-between rounded-xl border border-dashed p-2"
                      >
                        <span className="text-[10px] font-bold italic">
                          {item}
                        </span>
                        <Badge
                          variant="outline"
                          className="h-4 text-[8px] italic"
                        >
                          Qualified
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-4">
                  <Button className="h-10 rounded-2xl text-[9px] font-black tracking-widest uppercase italic shadow-lg">
                    <Navigation className="mr-1 size-3" /> Re-route
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 rounded-2xl border-2 text-[9px] font-black tracking-widest uppercase italic"
                  >
                    Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 rounded-2xl text-[9px] font-black tracking-widest text-rose-500 uppercase italic transition-colors hover:bg-rose-50"
                  >
                    Refund
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted/5 group col-span-3 flex h-full flex-col items-center justify-center border-2 border-dashed p-12 text-center shadow-sm">
              <div className="bg-muted mb-6 flex size-16 items-center justify-center rounded-3xl shadow-inner transition-transform duration-500 group-hover:scale-110">
                <Activity className="text-muted-foreground/40 size-8" />
              </div>
              <h3 className="mb-2 text-lg font-black italic opacity-60">
                Selection Required
              </h3>
              <p className="text-muted-foreground max-w-[200px] text-xs leading-relaxed font-medium italic">
                Select an active fulfillment stream to initialize the
                high-fidelity tactical monitoring hub.
              </p>
            </Card>
          )}
        </div>
      </div>

      <div className="pt-8">
        <Card className="border-2 shadow-sm">
          <CardHeader>
            <CardTitle className="font-bold italic">
              Active System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="bg-muted/30 flex flex-col gap-2 rounded-2xl border p-4">
              <Badge className="w-fit text-[9px] font-black uppercase italic">
                Strategic Update
              </Badge>
              <p className="text-sm font-bold">Version 2.0 Global Deployment</p>
              <p className="text-muted-foreground text-xs leading-relaxed font-medium italic">
                The primary API cluster and global fulfillment nodes will
                transition to the unified V2.0 stack at 12:00 AM UTC.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-2xl border border-rose-500/10 bg-rose-500/5 p-4">
              <Badge
                variant="destructive"
                className="w-fit text-[9px] font-black uppercase italic"
              >
                Critical Maintenance
              </Badge>
              <p className="text-sm font-bold text-rose-600">
                Primary Node Redundancy Check
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed font-medium italic">
                Failover testing for the EMEA region is scheduled for the next
                refresh cycle.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
