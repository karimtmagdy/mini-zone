import { Icon } from "@/assets/icon/icons";

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
      logo: Icon.CommandIcon,
      plan: "Enterprise",
    },
  ],
  main: [
    {
      title: "Intelligence & Auditing",
      url: "#",
      icon: Icon.LineChartIcon,
      isActive: false,
      items: [
        {
          title: "Executive Summary",
          url: KPI_DASHBOARD,
          icon: Icon.LayoutDashboardIcon,
        },
        {
          title: "Market Intelligence",
          url: KPI_ANALYTICS,
          icon: Icon.LineChartIcon,
        },
        {
          title: "Sales Analytics",
          url: KPI_SALES,
          icon: Icon.BadgeDollarSignIcon,
        },
        {
          title: "Revenue Tracking",
          url: KPI_REVENUE,
          icon: Icon.DollarSignIcon,
        },
        {
          title: "Audience Insights",
          url: KPI_TRAFFIC,
          icon: Icon.ActivityIcon,
        },
        {
          title: "Inventory Health",
          url: KPI_PRODUCTS,
          icon: Icon.PackageIcon,
        },
        {
          title: "Fulfillment Stats",
          url: KPI_ORDERS,
          icon: Icon.ShoppingCartIcon,
        },
        {
          title: "User Growth",
          url: KPI_USERS,
          icon: Icon.UsersIcon,
        },
        {
          title: "Activity Logs",
          url: KPI_LOGS,
          icon: Icon.HistoryIcon,
        },
        {
          title: "System Alerts",
          url: KPI_NOTIFICATIONS,
          icon: Icon.BellIcon,
        },
      ],
    },
    {
      title: "Management & Catalog",
      url: "#",
      icon: Icon.BoxIcon,
      isActive: true,
      items: [
        {
          title: "Inventory Catalog",
          url: PATH_PRODUCTS,
          icon: Icon.BoxIcon,
        },
        {
          title: "Sales Orders",
          url: PATH_ORDERS,
          icon: Icon.ShoppingBagIcon,
        },
        {
          title: "User Management",
          url: PATH_USERS,
          icon: Icon.UserCogIcon,
        },
        {
          title: "Categories",
          url: PATH_CATEGORIES,
          icon: Icon.LayersIcon,
        },
        {
          title: "Sub-Categories",
          url: PATH_SUBCATEGORIES,
          icon: Icon.TagsIcon,
        },
        {
          title: "Brand Partners",
          url: PATH_BRANDS,
          icon: Icon.AwardIcon,
        },
        {
          title: "Promotions",
          url: PATH_COUPONS,
          icon: Icon.TicketPercentIcon,
        },
      ],
    },
    {
      title: "Billing & Logistics",
      url: "#",
      icon: Icon.ReceiptTextIcon,
      items: [
        {
          title: "Invoices & Billing",
          url: PATH_INVOICES,
          icon: Icon.ReceiptTextIcon,
        },
        {
          title: "Shipping Logistics",
          url: PATH_SHIPPING,
          icon: Icon.TruckIcon,
        },
        {
          title: "Real-time Tracking",
          url: PATH_TRACKING,
          icon: Icon.NavigationIcon,
        },
      ],
    },
    {
      title: "Communications Hub",
      url: "#",
      icon: Icon.MessageSquareIcon,
      items: [
        {
          title: "Support Inbox",
          url: PATH_SUPPORT_INBOX,
          icon: Icon.MessageSquareIcon,
        },
      ],
    },
    {
      title: "System Settings",
      url: "#",
      icon: Icon.Settings2Icon,
      items: [
        {
          title: "My Profile",
          url: PATH_SETTINGS_PROFILE,
          icon: Icon.UserIcon,
        },
        {
          title: "Security & Keys",
          url: PATH_SETTINGS_SECURITY,
          icon: Icon.ShieldCheckIcon,
        },
        {
          title: "Visual Theme",
          url: PATH_SETTINGS_APPEARANCE,
          icon: Icon.PaletteIcon,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Market Research",
      url: "#",
      icon: Icon.LineChartIcon,
    },
    {
      name: "Brand Assets",
      url: "#",
      icon: Icon.AwardIcon,
    },
    {
      name: "Strategic Planning",
      url: "#",
      icon: Icon.LayoutDashboardIcon,
    },
  ],
};
