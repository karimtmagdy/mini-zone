import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  BarChart,
} from "recharts";
import {
  PageHead,
  PageHeadTitle,
  PageHeadGroup,
  PageHeadDescription,
} from "@/components/ui/head-page";
import {
  chartConfig,
  deviceSales,
  salesTrends,
} from "@/core/data/insights-data-sales";
import { Icon } from "@/assets/icon/icons";

export default function SalesKpiInsightsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHead>
        <PageHeadGroup>
          <PageHeadTitle>Sales Performance</PageHeadTitle>
          <PageHeadDescription>
            Monitor transaction volume, conversion rates, and sales trends.
          </PageHeadDescription>
        </PageHeadGroup>
      </PageHead>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Icon.ShoppingCartIcon className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-muted-foreground text-xs">
              +5.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Icon.TargetIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2%</div>
            <p className="text-muted-foreground text-xs">Target: 5.0%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Repeat Purchase
            </CardTitle>
            <Icon.ShoppingBagIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <p className="text-muted-foreground text-xs">+1.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon.TrendingUpIcon className="text-primary h-5 w-5" />
              Weekly Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={salesTrends}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0.1}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-revenue)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
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
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  fill="url(#colorRevenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3 transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Sales by Device</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                sales: { label: "Sales", color: "hsl(var(--primary))" },
              }}
              className="h-[300px] w-full"
            >
              <BarChart data={deviceSales}>
                <XAxis
                  dataKey="device"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ChartContainer>
            <div className="mt-6 space-y-4">
              {deviceSales.map((item) => (
                <div
                  key={item.device}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-sm"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm font-medium">{item.device}</span>
                  </div>
                  <span className="text-sm font-bold">
                    {((item.sales / 2500) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
