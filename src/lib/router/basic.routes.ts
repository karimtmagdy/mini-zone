/**
 * Front-end routes (react-router-dom).
 *
 * These strings are what you pass to `path`, `navigate()` and `<Link to>`.
 * They are NOT backend endpoints — for those see `@/core/endpoints`.
 *
 * Conventions
 * -----------
 * - Section roots are absolute ("/auth", "/panel", "/settings").
 * - Panel children stay relative ("brands") because they are rendered as
 *   children of the "/panel" route. Use `panelUrl()` / `ROUTES` to build an
 *   absolute URL from them.
 *
 * Back-office prefix
 * ------------------
 * The scratch draft used an "/admin/*" prefix for the exact same pages this
 * project already serves under "/panel". Since the panel already ships and
 * every consumer imports `PATHS.panel.*`, the "/admin/*" branch was dropped
 * and mapped onto `panel.*` instead of introducing a second prefix.
 */

/* ============================== Panel ============================== */

const PANEL_PATHS = {
  base: "/panel",

  /* catalog */
  brands: "catalog/brands",
  categories: "catalog/categories",
  subcategories: "catalog/subcategories",
  products: "catalog/products",
  inventory: "catalog/inventory",
  productTrash: "inventory/trash",
  inventoryHealth: "inventory/health",

  /* sales */
  sales: "sales",
  salesOrders: "sales-orders",
  purchase: "purchase",
  purchaseOrders: "purchase-orders",
  promotions: "marketing/promotions",

  /* management */
  users: "management/users",
  customers: "management/customers",
  employees: "employees",

  /* support / ops */
  reports: "reports",
  inbox: "support/inbox",
  invoices: "billing/invoices",
  shipping: "logistics/shipping",
  tracking: "logistics/tracking",

  /* stock */
  warehouses: "warehouses",
  stockAdjustments: "stock-adjustments",
  stockTransfers: "stock-transfers",

  /* kpis — draft mixed "kpi/" and "kpis/"; normalised to "kpis/". */
  kpis: {
    base: "kpis/dashboard",
    logs: "kpis/logs",
    sales: "kpis/sales",
    orders: "kpis/orders",
    inventory: "kpis/inventory",
    users: "kpis/users",
    analytics: "kpis/analytics",
    notifications: "kpis/notifications",
    traffic: "kpis/traffic",
    revenue: "kpis/revenue",
  },
} as const

/* ============================== Auth =============================== */

const AUTH_PATHS = {
  base: "/auth",
  login: "/auth/login",
  register: "/auth/register",
  login_admin: "/auth/login-admin",
  forgot_password: "/auth/forgot-password",
  reset_password: "/auth/reset-password",
  change_password: "/auth/change-password",
  verify_email: "/auth/verify-email",
  verify_phone: "/auth/verify-phone",
  verify_otp: "/auth/verify-otp",
  verify_otp_success: "/auth/verify-otp-success",
  verify_otp_failed: "/auth/verify-otp-failed",

  oauth: {
    google: "/auth/google",
    x: "/auth/x",
  },
} as const

/* ======================== User account area ======================== */

const SETTINGS_PATHS = {
  root: "/settings",
  profile: "/settings/profile",
  account: "/settings/account",
  security: "/settings/security",
  notifications: "/settings/notifications",
  privacy: "/settings/privacy",
  billing: "/settings/billing",
  roles: "/settings/roles",
  subscription: "/settings/subscription",
  payments: "/settings/payments",
  addresses: "/settings/addresses",
  preferences: "/settings/preferences",
  language: "/settings/language",
  theme: "/settings/theme",
  appearance: "/settings/appearance",
  accessibility: "/settings/accessibility",
  integrations: "/settings/integrations",
  help: "/settings/help",
  support: "/settings/support",
  feedback: "/settings/feedback",
  about: "/settings/about",
} as const

/* ================== Admin settings (inside panel) ================== */

const ADMIN_SETTINGS_PATHS = {
  base: `${PANEL_PATHS.base}/settings`,
  general: `${PANEL_PATHS.base}/settings/general`,
  profile: `${PANEL_PATHS.base}/settings/profile`,
  security: `${PANEL_PATHS.base}/settings/security`,
  notifications: `${PANEL_PATHS.base}/settings/notifications`,
  system: `${PANEL_PATHS.base}/settings/system`,
  appearance: `${PANEL_PATHS.base}/settings/appearance`,
} as const

/* ======================= System (inside panel) ===================== */

const SYSTEM_PATHS = {
  base: `${PANEL_PATHS.base}/system`,
  status: `${PANEL_PATHS.base}/system/status`,
} as const

/* ============================= Exports ============================= */

export const PATHS = {
  base: "/",
  about: "/about",

  auth: AUTH_PATHS,
  panel: PANEL_PATHS,
  settings: SETTINGS_PATHS,
  adminSettings: ADMIN_SETTINGS_PATHS,
  system: SYSTEM_PATHS,

  error: {
    notFound: "*",
    unauthorized: "/unauthorized",
    forbidden: "/forbidden",
  },
} as const

/**
 * Turn a panel child into an absolute URL.
 * `panelUrl(PATHS.panel.brands)` -> `/panel/catalog/brands`
 */
export const panelUrl = (child: string) =>
  `${PANEL_PATHS.base}/${child}`.replace(/\/+/g, "/")

/** Absolute builders for panel routes that take a route param. */
export const ROUTES = {
  panel: {
    productById: (id: string) => panelUrl(`${PANEL_PATHS.products}/${id}`),
  },
} as const

// get_me: "/auth/profile/account",
// update_me: "/auth/account",
// delete_me: "/auth/account",
// deactivate_me: "/auth/account",

// resend: "/auth/email/resend",
// verify: "/auth/phone/verify/:token",
// resend: "/auth/phone/resend",

// overview: "kpi/overview",
// permissions: "settings/permissions",

// tax: "settings/tax",
// localization: "settings/localization",
// cookies: "settings/cookies",
// policy: "settings/policy",
