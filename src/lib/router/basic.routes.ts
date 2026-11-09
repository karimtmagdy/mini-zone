const PANEL_PATHS = {
  base: "/panel",
  brands: "brands",
} as const

const AUTH_PATHS = {
  base: "/auth",
  login: "/auth/login",
  register: "/auth/register",
  login_admin: "/auth/login-admin",
  forgot_password: "/auth/forgot-password",
  reset_password: "/auth/reset-password",
} as const

export const PATHS = {
  base: "/",
  auth: AUTH_PATHS,
  panel: PANEL_PATHS,
  error: {
    notFound: "*",
    unauthorized: "/unauthorized",
    forbidden: "/forbidden",
  },
} as const
