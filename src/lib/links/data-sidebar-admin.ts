import { Icon } from "@/assets/icon/icons";

import { PATH_KPI, PATH_SETTINGS, PATH_ADMIN } from ".";

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
          url: PATH_KPI.DASHBOARD,
          icon: Icon.LayoutDashboardIcon,
        },
        {
          title: "Market Intelligence",
          url: PATH_KPI.ANALYTICS,
          icon: Icon.LineChartIcon,
        },
        {
          title: "Sales Analytics",
          url: PATH_KPI.SALES,
          icon: Icon.BadgeDollarSignIcon,
        },
        {
          title: "Revenue Tracking",
          url: PATH_KPI.REVENUE,
          icon: Icon.DollarSignIcon,
        },
        {
          title: "Audience Insights",
          url: PATH_KPI.TRAFFIC,
          icon: Icon.ActivityIcon,
        },
        {
          title: "Inventory Health",
          url: PATH_KPI.PRODUCTS,
          icon: Icon.PackageIcon,
        },
        {
          title: "Fulfillment Stats",
          url: PATH_KPI.ORDERS,
          icon: Icon.ShoppingCartIcon,
        },
        {
          title: "User Growth",
          url: PATH_KPI.USERS,
          icon: Icon.UsersIcon,
        },
        {
          title: "Activity Logs",
          url: PATH_KPI.LOGS,
          icon: Icon.HistoryIcon,
        },
        {
          title: "System Alerts",
          url: PATH_KPI.NOTIFICATIONS,
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
          url: PATH_ADMIN.PRODUCTS,
          icon: Icon.BoxIcon,
        },
        {
          title: "Sales Orders",
          url: PATH_ADMIN.ORDERS,
          icon: Icon.ShoppingBagIcon,
        },
        {
          title: "User Management",
          url: PATH_ADMIN.USERS,
          icon: Icon.UserCogIcon,
        },
        {
          title: "Categories",
          url: PATH_ADMIN.CATEGORIES,
          icon: Icon.LayersIcon,
        },
        {
          title: "Sub-Categories",
          url: PATH_ADMIN.SUBCATEGORIES,
          icon: Icon.TagsIcon,
        },
        {
          title: "Brand Partners",
          url: PATH_ADMIN.BRANDS,
          icon: Icon.AwardIcon,
        },
        {
          title: "Promotions",
          url: PATH_ADMIN.COUPONS,
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
          url: PATH_ADMIN.INVOICES,
          icon: Icon.ReceiptTextIcon,
        },
        {
          title: "Shipping Logistics",
          url: PATH_ADMIN.SHIPPING,
          icon: Icon.TruckIcon,
        },
        {
          title: "Real-time Tracking",
          url: PATH_ADMIN.TRACKING,
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
          url: PATH_ADMIN.SUPPORT_INBOX,
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
          url: PATH_SETTINGS.PROFILE,
          icon: Icon.UserIcon,
        },
        {
          title: "Security & Keys",
          url: PATH_SETTINGS.SECURITY,
          icon: Icon.ShieldCheckIcon,
        },
        {
          title: "Visual Theme",
          url: PATH_SETTINGS.APPEARANCE,
          icon: Icon.PaletteIcon,
        },
      ],
    },
  ],
};
