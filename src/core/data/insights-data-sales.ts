import type { ChartConfig } from "@/components/ui/chart";

export const salesTrends = [
  { day: "Mon", orders: 120, revenue: 12000 },
  { day: "Tue", orders: 150, revenue: 15000 },
  { day: "Wed", orders: 180, revenue: 18000 },
  { day: "Thu", orders: 140, revenue: 14000 },
  { day: "Fri", orders: 200, revenue: 20000 },
  { day: "Sat", orders: 250, revenue: 25000 },
  { day: "Sun", orders: 220, revenue: 22000 },
];

export const deviceSales = [
  { device: "Mobile", sales: 1500, fill: "hsl(var(--primary))" },
  { device: "Desktop", sales: 800, fill: "hsl(var(--secondary))" },
  { device: "Tablet", sales: 200, fill: "hsl(var(--accent))" },
];

export const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  orders: {
    label: "Orders",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;
