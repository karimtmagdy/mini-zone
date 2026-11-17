import { PATHS } from "@/lib/router/basic.routes"
import {
  Archive,
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Settings2,
  LayoutDashboard,
  ShoppingBag,
  Package,
  PackageOpen,
  Boxes,
  Warehouse,
  ArrowLeftRight,
  ClipboardList,
  Receipt,
  BadgePercent,
  Users,
  UserCog,
  Building2,
  FolderTree,
  Shapes,
  Scale,
  BarChart3,
  ShieldCheck,
  Cog,
  PlayCircle,
  Rocket,
  ScrollText,
} from "lucide-react"
// This is sample data.
export const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
          icon: Archive,
        },
        {
          title: "Starred",
          url: "#",
          icon: Archive,
        },
        {
          title: "Settings",
          url: "#",
          icon: Archive,
        },
      ],
    },
    {
      title: "Inventory",
      url: "#",
      icon: Warehouse,
      isActive: true,
      items: [
        {
          title: "Warehouses",
          url: PATHS.panel.warehouses,
          icon: Warehouse,
        },
        {
          title: "Stock Adjustments",
          url: PATHS.panel.stockAdjustments,
          icon: Package,
        },
        {
          title: "Stock Transfers",
          url: PATHS.panel.stockTransfers,
          icon: ArrowLeftRight,
        },
      ],
    },
    {
      title: "Sales",
      url: "#",
      icon: Receipt,
      items: [
        {
          title: "Sales Orders",
          url: PATHS.panel.salesOrders,
          icon: ClipboardList,
        },
        {
          title: "Purchase Orders",
          url: PATHS.panel.purchase,
          icon: PackageOpen,
        },
        {
          title: "Promotions",
          url: PATHS.panel.promotions,
          icon: BadgePercent,
        },
      ],
    },
    {
      title: "People",
      url: "#",
      icon: Users,
      items: [
        {
          title: "User Management",
          url: PATHS.panel.users,
          icon: Users,
        },
        {
          title: "Employee Management",
          url: PATHS.panel.employees,
          icon: UserCog,
        },
      ],
    },
    {
      title: "Catalog",
      url: "#",
      icon: ShoppingBag,
      items: [
        {
          title: "Inventory Catalog",
          url: PATHS.panel.inventory,
          icon: Boxes,
        },
        {
          title: "Products",
          url: PATHS.panel.products,
          icon: Package,
        },
        {
          title: "Categories",
          url: PATHS.panel.categories,
          icon: FolderTree,
        },
        {
          title: "Sub Categories",
          url: PATHS.panel.subcategories,
          icon: Shapes,
        },
        {
          title: "Brand Partners",
          url: PATHS.panel.brands,
          icon: Building2,
        },
        {
          title: "Units",
          // url: PATHS.panel.brands,
          icon: Scale,
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
          icon: BookOpen,
        },
        {
          title: "Get Started",
          url: "#",
          icon: Rocket,
        },
        {
          title: "Tutorials",
          url: "#",
          icon: PlayCircle,
        },
        {
          title: "Changelog",
          url: "#",
          icon: ScrollText,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
          icon: Cog,
        },
        {
          title: "Team",
          url: "#",
          icon: Users,
        },
        {
          title: "Billing",
          url: "#",
          icon: Receipt,
        },
        {
          title: "Permissions",
          url: "#",
          icon: ShieldCheck,
        },
      ],
    },
  ],
  projects: [
    {
      name: "Analytics",
      url: "#",
      icon: BarChart3,
    },
    {
      name: "Sales",
      url: "#",
      icon: Receipt,
    },
    {
      name: "Inventory",
      url: "#",
      icon: Warehouse,
    },
  ],
}
