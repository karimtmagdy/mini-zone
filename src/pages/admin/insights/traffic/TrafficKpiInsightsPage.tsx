import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Globe, MousePointer2, Clock, Share2 } from "lucide-react";

export default function TrafficKpiInsightsPage() {
  const visitorData = [
    { day: "Mon", organic: 4500, social: 1200, direct: 800 },
    { day: "Tue", organic: 5200, social: 1500, direct: 900 },
    { day: "Wed", organic: 4800, social: 1800, direct: 1100 },
    { day: "Thu", organic: 6100, social: 2100, direct: 1300 },
    { day: "Fri", organic: 5500, social: 2500, direct: 1500 },
    { day: "Sat", organic: 6700, social: 2800, direct: 1700 },
    { day: "Sun", organic: 5900, social: 2200, direct: 1400 },
  ];

  const chartConfig = {
    organic: {
      label: "Organic Search",
      color: "hsl(var(--primary))",
    },
    social: {
      label: "Social Media",
      color: "hsl(var(--secondary))",
    },
    direct: {
      label: "Direct Traffic",
      color: "hsl(var(--accent))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Traffic & Audience
        </h1>
        <p className="text-muted-foreground italic">
          Understand where your visitors are coming from and how they engage.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Globe className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.5k</div>
            <p className="text-muted-foreground text-xs">+18% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <p className="text-muted-foreground text-xs">-2.1% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Duration</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4m 32s</div>
            <p className="text-muted-foreground text-xs">Stable behavior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Social Shares</CardTitle>
            <Share2 className="h-4 w-4 text-pink-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-muted-foreground text-xs">+5% viral growth</p>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle>Traffic Source Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <LineChart data={visitorData}>
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
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="organic"
                stroke="var(--color-organic)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="social"
                stroke="var(--color-social)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="direct"
                stroke="var(--color-direct)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
