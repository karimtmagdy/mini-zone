import {
  Activity,
  History,
  Award,
  BadgeDollarSign,
  Bell,
  Command,
  DollarSign,
  Layers,
  LayoutDashboard,
  LineChart,
  Package,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  TicketPercent,
  Tags,
  UserCog,
  Users,
  Box,
  ReceiptText,
  Truck,
  Navigation,
  ShieldCheck,
  User,
  Palette,
  MessageSquare,
} from "lucide-react";
import {
  KPI_ANALYTICS,
  KPI_DASHBOARD,
  KPI_LOGS,
  KPI_NOTIFICATIONS,
  KPI_ORDERS,
  KPI_PRODUCTS,
  KPI_REVENUE,
  KPI_SALES,
  KPI_TRAFFIC,
  KPI_USERS,
  PATH_BRANDS,
  PATH_CATEGORIES,
  PATH_COUPONS,
  PATH_ORDERS,
  PATH_PRODUCTS,
  PATH_SUBCATEGORIES,
  PATH_USERS,
  PATH_INVOICES,
  PATH_SHIPPING,
  PATH_TRACKING,
  PATH_SUPPORT_INBOX,
  PATH_SETTINGS_PROFILE,
  PATH_SETTINGS_SECURITY,
  PATH_SETTINGS_APPEARANCE,
} from "./paths.routes";

export const data = {
  user: {
    name: "Karim Admin",
    email: "admin@mini-zone.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Mini-Zone HQ",
      logo: Command,
      plan: "Enterprise",
    },
  ],
  main: [
    {
      title: "Intelligence & Auditing",
      url: "#",
      icon: LineChart,
      isActive: true,
      items: [
        {
          title: "Executive Summary",
          url: KPI_DASHBOARD,
          icon: LayoutDashboard,
        },
        {
          title: "Market Intelligence",
          url: KPI_ANALYTICS,
          icon: LineChart,
        },
        {
          title: "Sales Analytics",
          url: KPI_SALES,
          icon: BadgeDollarSign,
        },
        {
          title: "Revenue Tracking",
          url: KPI_REVENUE,
          icon: DollarSign,
        },
        {
          title: "Audience Insights",
          url: KPI_TRAFFIC,
          icon: Activity,
        },
        {
          title: "Inventory Health",
          url: KPI_PRODUCTS,
          icon: Package,
        },
        {
          title: "Fulfillment Stats",
          url: KPI_ORDERS,
          icon: ShoppingCart,
        },
        {
          title: "User Growth",
          url: KPI_USERS,
          icon: Users,
        },
        {
          title: "Activity Logs",
          url: KPI_LOGS,
          icon: History,
        },
        {
          title: "System Alerts",
          url: KPI_NOTIFICATIONS,
          icon: Bell,
        },
      ],
    },
    {
      title: "Management & Catalog",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Inventory Catalog",
          url: PATH_PRODUCTS,
          icon: Box,
        },
        {
          title: "Sales Orders",
          url: PATH_ORDERS,
          icon: ShoppingBag,
        },
        {
          title: "User Management",
          url: PATH_USERS,
          icon: UserCog,
        },
        {
          title: "Product Categories",
          url: PATH_CATEGORIES,
          icon: Layers,
        },
        {
          title: "Sub-Categories",
          url: PATH_SUBCATEGORIES,
          icon: Tags,
        },
        {
          title: "Brand Partners",
          url: PATH_BRANDS,
          icon: Award,
        },
        {
          title: "Promotions",
          url: PATH_COUPONS,
          icon: TicketPercent,
        },
      ],
    },
    {
      title: "Billing & Logistics",
      url: "#",
      icon: ReceiptText,
      items: [
        {
          title: "Invoices & Billing",
          url: PATH_INVOICES,
          icon: ReceiptText,
        },
        {
          title: "Shipping Logistics",
          url: PATH_SHIPPING,
          icon: Truck,
        },
        {
          title: "Real-time Tracking",
          url: PATH_TRACKING,
          icon: Navigation,
        },
      ],
    },
    {
      title: "Communications Hub",
      url: "#",
      icon: MessageSquare,
      items: [
        {
          title: "Support Inbox",
          url: PATH_SUPPORT_INBOX,
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "My Profile",
          url: PATH_SETTINGS_PROFILE,
          icon: User,
        },
        {
          title: "Security & Keys",
          url: PATH_SETTINGS_SECURITY,
          icon: ShieldCheck,
        },
        {
          title: "Visual Theme",
          url: PATH_SETTINGS_APPEARANCE,
          icon: Palette,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Market Research",
      url: "#",
      icon: LineChart,
    },
    {
      name: "Brand Assets",
      url: "#",
      icon: Award,
    },
    {
      name: "Strategic Planning",
      url: "#",
      icon: LayoutDashboard,
    },
  ],
};
