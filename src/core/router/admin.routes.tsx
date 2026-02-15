import LayoutAdmin from "@/layouts/LayoutAdmin";
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
  PATH_INVOICES,
  PATH_ORDERS,
  PATH_PRODUCTS,
  PATH_SETTINGS,
  PATH_SETTINGS_APPEARANCE,
  PATH_SETTINGS_PROFILE,
  PATH_SETTINGS_SECURITY,
  PATH_SHIPPING,
  PATH_SUBCATEGORIES,
  PATH_TRACKING,
  PATH_SUPPORT_INBOX,
  PATH_USERS,
} from "@/lib/links/paths.routes";

// Page Imports
import BrandsPage from "@/pages/admin/brands/BrandsPage";
import CategoriesPage from "@/pages/admin/categories/CategoriesPage";
import CouponsPage from "@/pages/admin/coupons/CouponsPage";
import AnalyticsKpiInsightsPage from "@/pages/admin/insights/analytics/AnalyticsKpiInsightsPage";
import DashboardPage from "@/pages/admin/insights/dashboard/DashboardPage";
import ActivityLogsPage from "@/pages/admin/insights/activity/ActivityLogsPage";
import NotificationsKpiInsightsPage from "@/pages/admin/insights/notifications/NotificationsKpiInsightsPage";
import OrdersKpiInsightsPage from "@/pages/admin/insights/orders/OrdersKpiInsightsPage";
import ProductsKpiInsightsPage from "@/pages/admin/insights/products/ProductsKpiInsightsPage";
import RevenueKpisInsightsPage from "@/pages/admin/insights/revenue/RevenueKpisInsightsPage";
import SalesKpiInsightsPage from "@/pages/admin/insights/sales/SalesKpiInsightsPage";
import TrafficKpiInsightsPage from "@/pages/admin/insights/traffic/TrafficKpiInsightsPage";
import UsersKpiInsightsPage from "@/pages/admin/insights/users/UsersKpiInsightsPage";
import OrdersPage from "@/pages/admin/orders/OrdersPage";
import ProductsPage from "@/pages/admin/products/ProductsPage";
import SubcategoriesPage from "@/pages/admin/subcategories/SubcategoriesPage";
import UsersPage from "@/pages/admin/users/UsersPage";

// New Page Imports
import InvoicesPage from "@/pages/admin/billing/InvoicesPage";
import ShippingLogisticsPage from "@/pages/admin/logistics/ShippingLogisticsPage";
import OrderTrackingPage from "@/pages/admin/logistics/OrderTrackingPage";
import SettingsLayout from "@/pages/admin/settings/SettingsLayout";
import ProfileSettingsPage from "@/pages/admin/settings/ProfileSettingsPage";
import SecuritySettingsPage from "@/pages/admin/settings/SecuritySettingsPage";
import AppearanceSettingsPage from "@/pages/admin/settings/AppearanceSettingsPage";

import { Navigate } from "react-router-dom";
import SupportInboxPage from "@/pages/admin/support/SupportInboxPage";

const kpiRoutes = [
  {
    path: KPI_DASHBOARD,
    Component: DashboardPage,
    handle: { crumb: () => "Dashboard" },
  },
  {
    path: KPI_ANALYTICS,
    Component: AnalyticsKpiInsightsPage,
    handle: { crumb: () => "Intelligence" },
  },
  {
    path: KPI_SALES,
    Component: SalesKpiInsightsPage,
    handle: { crumb: () => "Sales Metrics" },
  },
  {
    path: KPI_TRAFFIC,
    Component: TrafficKpiInsightsPage,
    handle: { crumb: () => "Audience" },
  },
  {
    path: KPI_NOTIFICATIONS,
    Component: NotificationsKpiInsightsPage,
    handle: { crumb: () => "Alerts" },
  },
  {
    path: KPI_LOGS,
    Component: ActivityLogsPage,
    handle: { crumb: () => "System Logs" },
  },
  {
    path: KPI_PRODUCTS,
    Component: ProductsKpiInsightsPage,
    handle: { crumb: () => "Inventory Health" },
  },
  {
    path: KPI_ORDERS,
    Component: OrdersKpiInsightsPage,
    handle: { crumb: () => "Fulfillment Stats" },
  },
  {
    path: KPI_USERS,
    Component: UsersKpiInsightsPage,
    handle: { crumb: () => "User Growth" },
  },
  {
    path: KPI_REVENUE,
    Component: RevenueKpisInsightsPage,
    handle: { crumb: () => "Financial Highlights" },
  },
];

const managementRoutes = [
  {
    path: PATH_USERS,
    Component: UsersPage,
    handle: { crumb: () => "User Management" },
  },
  {
    path: PATH_PRODUCTS,
    Component: ProductsPage,
    handle: { crumb: () => "Inventory Catalog" },
  },
  {
    path: PATH_ORDERS,
    Component: OrdersPage,
    handle: { crumb: () => "Sales Orders" },
  },
  {
    path: PATH_CATEGORIES,
    Component: CategoriesPage,
    handle: { crumb: () => "Categories" },
  },
  {
    path: PATH_SUBCATEGORIES,
    Component: SubcategoriesPage,
    handle: { crumb: () => "Sub-Categories" },
  },
  {
    path: PATH_BRANDS,
    Component: BrandsPage,
    handle: { crumb: () => "Brand Partners" },
  },
  {
    path: PATH_COUPONS,
    Component: CouponsPage,
    handle: { crumb: () => "Promotions" },
  },
];

const billingRoutes = [
  {
    path: PATH_INVOICES,
    Component: InvoicesPage,
    handle: { crumb: () => "Billing Records" },
  },
];

const logisticsRoutes = [
  {
    path: PATH_SHIPPING,
    Component: ShippingLogisticsPage,
    handle: { crumb: () => "Shipping & Logistics" },
  },
  {
    path: PATH_TRACKING,
    Component: OrderTrackingPage,
    handle: { crumb: () => "Real-time Tracking" },
  },
];

const supportRoutes = [
  {
    path: PATH_SUPPORT_INBOX,
    Component: SupportInboxPage,
    handle: { crumb: () => "Support Hub" },
  },
];

const settingsRoutes = [
  {
    path: PATH_SETTINGS,
    Component: SettingsLayout,
    handle: { crumb: () => "Settings" },
    children: [
      {
        index: true,
        element: <Navigate to={PATH_SETTINGS_PROFILE} replace />,
      },
      {
        path: PATH_SETTINGS_PROFILE,
        Component: ProfileSettingsPage,
        handle: { crumb: () => "Profile" },
      },
      {
        path: PATH_SETTINGS_SECURITY,
        Component: SecuritySettingsPage,
        handle: { crumb: () => "Security" },
      },
      {
        path: PATH_SETTINGS_APPEARANCE,
        Component: AppearanceSettingsPage,
        handle: { crumb: () => "Appearance" },
      },
    ],
  },
];

export const PagesAdmin = [
  {
    path: "admin",
    Component: LayoutAdmin,
    children: [
      {
        index: true,
        element: <Navigate to={KPI_DASHBOARD} replace />,
      },
      ...kpiRoutes,
      ...managementRoutes,
      ...billingRoutes,
      ...logisticsRoutes,
      ...supportRoutes,
      ...settingsRoutes,
    ],
  },
];
