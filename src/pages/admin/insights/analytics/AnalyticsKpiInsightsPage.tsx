import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/assets/icon/icons";

export default function AnalyticsKpiInsightsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground">
            Deep dive into your store's performance metrics.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Icon.CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <Icon.DownloadIcon className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="from-primary/10 border-primary/20 bg-linear-to-br to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium italic">
              Conversion Rate
            </CardTitle>
            <Icon.TargetIcon className="text-primary h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.24%</div>
            <div className="mt-2 flex items-center gap-1 text-xs font-medium text-emerald-500">
              <Icon.ArrowUpRightIcon className="h-4 w-4" />
              <span>+1.2% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-linear-to-br from-emerald-500/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium italic">
              Avg. Order Value
            </CardTitle>
            <Icon.TrendingUpIcon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$124.50</div>
            <div className="text-muted-foreground mt-2 text-xs">
              Target:{" "}
              <span className="text-foreground font-semibold">$150.00</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-linear-to-br from-blue-500/10 to-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium italic">
              Returning Customers
            </CardTitle>
            <Icon.FilterIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24%</div>
            <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
              <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                <div className="h-full w-[24%] bg-blue-500" />
              </div>
              <span>24% Growth</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/30 flex min-h-[400px] items-center justify-center border-dashed">
        <div className="flex max-w-sm flex-col items-center gap-4 text-center">
          <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
            <Icon.TrendingUpIcon className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold italic">
            Interactive Charts Coming Soon
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We are integrating with{" "}
            <Badge variant="secondary" className="px-1 font-mono">
              Chart.js
            </Badge>{" "}
            and
            <Badge variant="secondary" className="px-1 font-mono">
              Recharts
            </Badge>{" "}
            to bring you pixel-perfect interactive visualizations.
          </p>
          <Button variant="outline" size="sm" className="mt-2">
            Preview Beta Features
          </Button>
        </div>
      </Card>
    </div>
  );
}
