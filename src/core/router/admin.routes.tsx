import AdminLayout from "@/layouts/AdminLayout";
import { PATH_SETTINGS, PATH_KPI, PATH_ADMIN } from "@/lib/links";

// Page Imports

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


const kpiRoutes = [
  {
    path: PATH_KPI.DASHBOARD,
    Component: DashboardPage,
    handle: { crumb: () => "Dashboard" },
  },
  {
    path: PATH_KPI.ANALYTICS,
    Component: AnalyticsKpiInsightsPage,
    handle: { crumb: () => "Intelligence" },
  },
  {
    path: PATH_KPI.SALES,
    Component: SalesKpiInsightsPage,
    handle: { crumb: () => "Sales Metrics" },
  },
  {
    path: PATH_KPI.TRAFFIC,
    Component: TrafficKpiInsightsPage,
    handle: { crumb: () => "Audience" },
  },
  {
    path: PATH_KPI.NOTIFICATIONS,
    Component: NotificationsKpiInsightsPage,
    handle: { crumb: () => "Alerts" },
  },
  {
    path: PATH_KPI.LOGS,
    Component: ActivityLogsPage,
    handle: { crumb: () => "System Logs" },
  },
  {
    path: PATH_KPI.PRODUCTS,
    Component: ProductsKpiInsightsPage,
    handle: { crumb: () => "Inventory Health" },
  },
  {
    path: PATH_KPI.ORDERS,
    Component: OrdersKpiInsightsPage,
    handle: { crumb: () => "Fulfillment Stats" },
  },
  {
    path: PATH_KPI.USERS,
    Component: UsersKpiInsightsPage,
    handle: { crumb: () => "User Growth" },
  },
  {
    path: PATH_KPI.REVENUE,
    Component: RevenueKpisInsightsPage,
    handle: { crumb: () => "Financial Highlights" },
  },
];

const managementRoutes = [
  {
    path: PATH_ADMIN.USERS,
    Component: UsersPage,
    handle: { crumb: () => "User Management" },
  },
  {
    path: PATH_ADMIN.PRODUCTS,
    Component: ProductsPage,
    handle: { crumb: () => "Inventory Catalog" },
  },
  {
    path: PATH_ADMIN.ORDERS,
    Component: OrdersPage,
    handle: { crumb: () => "Sales Orders" },
  },
  {
    path: PATH_ADMIN.CATEGORIES,
    Component: CategoriesPage,
    handle: { crumb: () => "Categories" },
  },
  {
    path: PATH_ADMIN.SUBCATEGORIES,
    Component: SubcategoriesPage,
    handle: { crumb: () => "Sub-Categories" },
  },

  {
    path: PATH_ADMIN.COUPONS,
    Component: CouponsPage,
    handle: { crumb: () => "Promotions" },
  },
];

const billingRoutes = [
  {
    path: PATH_ADMIN.INVOICES,
    Component: InvoicesPage,
    handle: { crumb: () => "Billing Records" },
  },
];

const logisticsRoutes = [
  {
    path: PATH_ADMIN.SHIPPING,
    Component: ShippingLogisticsPage,
    handle: { crumb: () => "Shipping & Logistics" },
  },
  {
    path: PATH_ADMIN.TRACKING,
    Component: OrderTrackingPage,
    handle: { crumb: () => "Real-time Tracking" },
  },
];



const settingsRoutes = [
  {
    path: PATH_SETTINGS.BASE,
    Component: SettingsLayout,
    handle: { crumb: () => "Settings" },
    children: [
      {
        index: true,
        element: <Navigate to={PATH_SETTINGS.PROFILE} replace />,
      },
      {
        path: PATH_SETTINGS.PROFILE,
        Component: ProfileSettingsPage,
        handle: { crumb: () => "Profile" },
      },
      {
        path: PATH_SETTINGS.SECURITY,
        Component: SecuritySettingsPage,
        handle: { crumb: () => "Security" },
      },
      {
        path: PATH_SETTINGS.APPEARANCE,
        Component: AppearanceSettingsPage,
        handle: { crumb: () => "Appearance" },
      },
    ],
  },
];

export const PagesAdmin = [
  {
    path: "admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        element: <Navigate to={PATH_KPI.DASHBOARD} replace />,
      },
      ...kpiRoutes,
      ...managementRoutes,
      ...billingRoutes,
      ...logisticsRoutes,
      ...settingsRoutes,
    ],
  },
];
