import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react"

export function DashboardPage() {
  return (
    <div className="flex min-h-[160dvh] flex-col gap-6">
      {/* Top Welcome Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here is a summary of your recent system activity.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-500">
                +20.1% <ArrowUpRight className="size-3" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-500">
                +180.1% <ArrowUpRight className="size-3" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-500">
                +19% <ArrowUpRight className="size-3" />
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium text-emerald-500">
                +201 <TrendingUp className="size-3" />
              </span>
              since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts / Content Placeholder Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Monthly recurring performance and active conversions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-80 items-center justify-center rounded-lg border border-dashed text-muted-foreground">
              [ Chart Visualization Placeholder ]
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  name: "Olivia Martin",
                  email: "olivia.martin@email.com",
                  amount: "+$1,999.00",
                },
                {
                  name: "Jackson Lee",
                  email: "jackson.lee@email.com",
                  amount: "+$39.00",
                },
                {
                  name: "Isabella Nguyen",
                  email: "isabella.nguyen@email.com",
                  amount: "+$299.00",
                },
                {
                  name: "William Kim",
                  email: "will@email.com",
                  amount: "+$99.00",
                },
                {
                  name: "Sofia Davis",
                  email: "sofia.davis@email.com",
                  amount: "+$39.00",
                },
              ].map((item) => (
                <div
                  key={item.email}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.email}
                    </p>
                  </div>
                  <div className="text-sm font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional tall section to ensure scrolling beyond h-dvh */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>Metric Section #{index + 1}</CardTitle>
              <CardDescription>
                Detailed statistical report and telemetry data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-44 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                Data Block #{index + 1}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Footer Section inside Page */}
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        End of Dashboard Page (Scroll test area - height exceeds 160dvh)
      </div>
    </div>
  )
}
