import type { RouteObject } from "react-router-dom"

import { AuthLayout } from "@/components/layout/AuthLayout"
import { RequireGuest } from "@/features/auth/components/require-guest"
import { PATHS } from "@/lib/router/basic.routes"
import { LoginAdminPage } from "@/pages/auth/LoginAdminPage"
import { LoginPage } from "@/pages/auth/LoginPage"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { SetupAdminPage } from "@/pages/auth/SetupAdminPage"

export const Auth = [
  {
    path: PATHS.auth.base,
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <RequireGuest>
            <LoginPage />
          </RequireGuest>
        ),
      },
      {
        path: "register",
        element: (
          <RequireGuest>
            <RegisterPage />
          </RequireGuest>
        ),
      },
      {
        path: "login-admin",
        element: (
          <RequireGuest>
            <LoginAdminPage />
          </RequireGuest>
        ),
      },
      // Public route on purpose: guests see a gate, signed-in customers bootstrap.
      {
        path: "setup-admin",
        element: <SetupAdminPage />,
      },
    ],
  },
] as RouteObject[]
