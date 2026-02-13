import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  Pie,
  PieChart,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { Icon } from "@/assets/icon/icons";

export default function ProductsKpiInsightsPage() {
  const inventoryData = [
    { name: "In Stock", value: 450, color: "hsl(var(--primary))" },
    { name: "Low Stock", value: 45, color: "hsl(var(--warning))" },
    { name: "Out of Stock", value: 12, color: "hsl(var(--destructive))" },
  ];

  const monthlyStock = [
    { month: "Jan", stock: 400 },
    { month: "Feb", stock: 300 },
    { month: "Mar", stock: 500 },
    { month: "Apr", stock: 450 },
    { month: "May", stock: 600 },
    { month: "Jun", stock: 550 },
  ];

  const chartConfig = {
    stock: {
      label: "Inventory Level",
      color: "hsl(var(--primary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Products Analytics
        </h1>
        <p className="text-muted-foreground italic">
          Comprehensive overview of your inventory health and product
          performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total SKUs</CardTitle>
            <Icon.PackageIcon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">507</div>
            <p className="text-muted-foreground text-xs">
              +12 added this month
            </p>
          </CardContent>
        </Card>
        <Card className="border-orange-500/20 bg-orange-500/5 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Low Stock Alerts
            </CardTitle>
            <Icon.AlertTriangleIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">45</div>
            <p className="text-muted-foreground text-xs">
              Action required soon
            </p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20 bg-emerald-500/5 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Healthy Inventory
            </CardTitle>
            <Icon.CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">89%</div>
            <p className="text-muted-foreground text-xs">
              Optimal stock levels
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon.TrendingUpIcon className="text-primary h-5 w-5" />
              Stock Level Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={monthlyStock}>
                <defs>
                  <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-stock)"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-stock)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="stock"
                  stroke="var(--color-stock)"
                  fillOpacity={1}
                  fill="url(#colorStock)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {inventoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid w-full grid-cols-3 gap-4 text-center">
              {inventoryData.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <span className="text-muted-foreground text-xs uppercase">
                    {item.name}
                  </span>
                  <span className="text-lg font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
