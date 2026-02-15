import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { Icon } from "@/assets/icon/icons";
export default function SectionCardDashBaord() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: Icon.DollarSignIcon,
    },
    {
      title: "Active Users",
      value: "+2350",
      change: "+180.1%",
      trend: "up",
      icon: Icon.UsersIcon,
    },
    {
      title: "Sales",
      value: "+12,234",
      change: "+19%",
      trend: "up",
      icon: Icon.CreditCardIcon,
    },
    {
      title: "Active Now",
      value: "+573",
      change: "-201",
      trend: "down",
      icon: Icon.ActivityIcon,
    },
  ];
  return (
    <div className="@container/card grid grid-cols-1 gap-4 @lg:grid-cols-2 @4xl:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={i}>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardDescription>{stat.title}</CardDescription>
              <stat.icon className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent className="flex flex-col items-start">
              <CardAction className="flex items-center text-2xl font-bold">
                <Icon.DollarSignIcon className="size-5" />
                {stat.value}
              </CardAction>
              <CardAction className="flex items-center gap-2">
                {stat.trend === "up" ? (
                  <Icon.TrendingUpIcon className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Icon.TrendingDownIcon className="h-4 w-4 text-rose-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-emerald-500" : "text-rose-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-xxs text-muted-foreground text-left">
                  from last month
                </span>
              </CardAction>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
