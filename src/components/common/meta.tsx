import {
  PageHeadActions,
  PageHeadDescription,
  PageHeadTitle,
} from "@/components/ui/head-page";
import { PATH_SETTINGS, PATH_ADMIN } from "@/lib/links";
import { useLocation } from "react-router-dom";

// ADMIN_ROUTES
const pageMeta: Record<
  string,
  { path: string; title: string; description: string }
> = {
  brands: {
    path: PATH_ADMIN.BRANDS,
    title: "Brand Partners",
    description: "Manage your brand relationships and their product catalogs.",
  },
  categories: {
    path: PATH_ADMIN.CATEGORIES,
    title: "Categories",
    description: "Organize your products into logical groups and hierarchies.",
  },
  subcategories: {
    path: PATH_ADMIN.SUBCATEGORIES,
    title: "Subcategories",
    description:
      "Define granular product groupings within your main categories.",
  },
  products: {
    path: PATH_ADMIN.PRODUCTS,
    title: "Inventory Catalog",
    description: "Manage your catalog, track stock levels, and update pricing.",
  },
  orders: {
    path: PATH_ADMIN.ORDERS,
    title: "Orders",
    description: "Monitor and manage customer orders and fulfillment status.",
  },
  users: {
    path: PATH_ADMIN.USERS,
    title: "User Management",
    description:
      "Manage your application users, roles, and access permissions.",
  },
  coupons: {
    path: PATH_ADMIN.COUPONS,
    title: "Promotions & Coupons",
    description: "Create and track discount codes and marketing promotions.",
  },
  invoices: {
    path: PATH_ADMIN.INVOICES,
    title: "Billing & Invoices",
    description: "Manage your customer billing cycles and financial records.",
  },
  settigns: {
    path: PATH_SETTINGS.BASE,
    title: "Global Settings",
    description:
      "Configure your administrative experience and security preferences.",
  },
  orderTracking: {
    path: PATH_ADMIN.TRACKING,
    title: "Real-time Command Hub",
    description: "Monitor your global fleet and active fulfillment streams.",
  },
  shipping: {
    path: PATH_ADMIN.SHIPPING,
    title: "Shipping & Logistics",
    description: "Monitor carrier performance and real-time order tracking.",
  },
  // products: {
  //   path: PATH_CATEGORIES,
  //   title: "",
  //   description: "",
  // },
  // products: {
  //   path: PATH_CATEGORIES,
  //   title: "",
  //   description: "",
  // },
  // products: {
  //   path: PATH_CATEGORIES,
  //   title: "",
  //   description: "",
  // },
  // products: {
  //   path: PATH_CATEGORIES,
  //   title: "",
  //   description: "",
  // },
  // products: {
  //   path: PATH_CATEGORIES,
  //   title: "",
  //   description: "",
  // },
} as const;
export const PAGE_META = Object.values(pageMeta).reduce(
  (acc, route) => {
    acc[route.path] = {
      title: route.title,
      description: route.description,
    };
    return acc;
  },
  {} as Record<string, { title: string; description: string }>,
);
export function TopHeadMeta() {
  const { pathname } = useLocation();

  const matchedRoute = Object.entries(PAGE_META).find(([path]) =>
    pathname.startsWith(path),
  );
  const meta = matchedRoute?.[1];
  return (
    <PageHeadActions responsive="col" align="start">
      <div className="flex items-center gap-2">
        <PageHeadTitle>{meta?.title}</PageHeadTitle>
      </div>
      <PageHeadDescription>{meta?.description}</PageHeadDescription>
    </PageHeadActions>
  );
}
