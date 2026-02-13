import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Icon } from "@/assets/icon/icons";

export default function NotificationsKpiInsightsPage() {
  const deliveryData = [
    { channel: "Email", sent: 12000, delivered: 11800 },
    { channel: "Push", sent: 8000, delivered: 7200 },
    { channel: "SMS", sent: 2000, delivered: 1950 },
  ];

  const chartConfig = {
    sent: {
      label: "Messages Sent",
      color: "hsl(var(--primary))",
    },
    delivered: {
      label: "Delivered",
      color: "hsl(var(--secondary))",
    },
  } satisfies ChartConfig;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notification Analytics
        </h1>
        <p className="text-muted-foreground italic">
          Track the performance of your marketing emails and system alerts.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Email Open Rate
            </CardTitle>
            <Icon.MailIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.8%</div>
            <p className="text-muted-foreground text-xs">
              +2.1% from industry avg
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Push Click-through
            </CardTitle>
            <Icon.BellIcon className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-muted-foreground text-xs">Target: 10.0%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Messages
            </CardTitle>
            <Icon.SendIcon className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22.4k</div>
            <p className="text-muted-foreground text-xs">Across all channels</p>
          </CardContent>
        </Card>
      </div>

      <Card className="transition-all hover:shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon.MessageSquareIcon className="text-primary h-5 w-5" />
            Delivery Performance by Channel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="channel"
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
              <Bar
                dataKey="sent"
                fill="var(--color-sent)"
                radius={[4, 4, 0, 0]}
                barSize={50}
              />
              <Bar
                dataKey="delivered"
                fill="var(--color-delivered)"
                radius={[4, 4, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
