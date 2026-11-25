/**
 * Backend API endpoints.
 *
 * Paths are relative to the `http-client` baseURL, which already resolves to
 * `.../api/v1` (see `VITE_DEV_URL` / `VITE_PROD_URL` in `.env`).
 *
 * `live`     -> the Express route exists today (see api/src/presentation/routes).
 * `planned`  -> front-end contract only; the router is still commented out in
 *               api/src/presentation/routes/index.ts, so these return 404 until
 *               the backend ships them.
 */

/** Standard shape for a resource mounted at `base` exposing an `:id` param. */
const rest = (base: string) => ({
  base,
  one: (id: string) => `${base}/${id}`,
  archive: (id: string) => `${base}/archive/${id}`,
  restore: (id: string) => `${base}/restore/${id}`,
  status: (id: string) => `${base}/status/${id}`,
})

export const API = {
  /* ===== live ===== */
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  brands: rest("/brands"),
  categories: rest("/categories"),
  employees: {
    ...rest("/employees"),
    bootstrap: "/employees/bootstrap",
    hire: "/employees/hire",
  },

  /* ===== planned ===== */
  cart: rest("/cart"),

  _2fa: {
    setup: "/auth/2fa/setup",
    enable: "/auth/2fa/enable",
    disable: "/auth/2fa/disable",
    verify: "/auth/2fa/verify",
  },

  profile: {
    /** The backend has no dedicated profile route: it is `GET /auth/me`. */
    me: "/auth/me",
  },

  verify: {
    email: "/auth/verify-email/:token",
    phone: "/auth/verify-phone/:token",
    otp: "/auth/verify-otp",
  },

  oauth: {
    google: "/auth/google",
    x: "/auth/x",
  },

  dashboard: {
    base: "/dashboard",
    overview: "/dashboard/overview",
    /** `analysis` and `analytics` both appeared in the draft — confirm which is real. */
    analysis: "/dashboard/analysis",
    analytics: "/dashboard/analytics",
    activities: "/dashboard/activities",
    logs: "/dashboard/logs",
    products: "/dashboard/products",
    sales: "/dashboard/sales",
    salesByDay: "/dashboard/sales/by-day",
    users: "/dashboard/users",
    customers: "/dashboard/customers",
    reports: "/dashboard/reports",
    notifications: "/dashboard/notifications",
    traffic: "/dashboard/traffic",
    revenue: "/dashboard/revenue",
    settings: "/dashboard/settings",
  },
} as const
