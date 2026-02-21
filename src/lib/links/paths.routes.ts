// Admin Routes
export const PATH_ADMIN = {
  CATEGORIES: "/admin/catalog/categories",
  SUBCATEGORIES: "/admin/catalog/subcategories",
  BRANDS: "/admin/catalog/brands",
  PRODUCTS: "/admin/inventory",
  ORDERS: "/admin/sales-orders",
  USERS: "/admin/management/users",
  COUPONS: "/admin/marketing/promotions",
  CUSTOMERS: "/admin/management/customers",
  REPORTS: "/admin/reports",
  SUPPORT_INBOX: "/admin/support/inbox",
  INVOICES: "/admin/billing/invoices",
  SHIPPING: "/admin/logistics/shipping",
  TRACKING: "/admin/logistics/tracking",
};
// SEO Routes
export const PATH_SEO = {
  BASE: "/seo",
  TITLE: "/seo/title",
  DESCRIPTION: "/seo/description",
  KEYWORDS: "/seo/keywords",
  OG: "/seo/og",
  TWITTER: "/seo/twitter",
  CANONICAL: "/seo/canonical",
  ROBOTS: "/seo/robots",
  SITEMAP: "/seo/sitemap",
  FAQ: "/seo/faq",
  FAQ_SCHEMA: "/seo/faq-schema",
};
// KPI Routes
export const PATH_KPI = {
  //   DASHBOARD: "/kpi/dashboard",
  DASHBOARD: "/admin/dashboard",
  SALES: "/admin/dashboard/sales",
  LOGS: "/admin/dashboard/logs",
  ORDERS: "/admin/dashboard/orders-kpi",
  PRODUCTS: "/admin/dashboard/inventory-kpi",
  USERS: "/admin/dashboard/users-kpi",
  ANALYTICS: "/admin/dashboard/analytics",
  NOTIFICATIONS: "/admin/dashboard/notifications",
  TRAFFIC: "/admin/dashboard/traffic",
  REVENUE: "/admin/dashboard/revenue",
};
// Auth Routes
export const PATH_AUTH = {
  SIGNIN: "/auth/login",
  SIGNUP: "/auth/register",
  SIGNOUT: "/auth/logout",
  SIGNOUT_DEVICES: "/auth/logout-devices",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  VERIFY_EMAIL: "/auth/verify-email",
  REFRESH_TOKEN: "/auth/refresh-token",
  ME: "/users/me",
  CHANGE_PASSWORD: "/users/change-password",
};
// Settings Nested Routes
export const PATH_SETTINGS = {
  BASE: "/admin/settings",
  PROFILE: "/admin/settings/profile",
  SECURITY: "/admin/settings/security",
  APPEARANCE: "/admin/settings/appearance",
};
