import type { RouteObject } from "react-router-dom"
import { PATHS } from "./basic.routes"
import { RegisterPage } from "@/pages/auth/RegisterPage"
import { LoginPage } from "@/pages/auth/LoginPage"
import { RequireGuest } from "@/features/auth/components/require-guest"
import { AuthLayout } from "@/components/layout/AuthLayout"

export const Auth = [
  {
    path: PATHS.auth.base,
    element: (
      <RequireGuest>
        <AuthLayout />
      </RequireGuest>
    ),
    children: [
      { path: PATHS.auth.register, element: <RegisterPage /> },
      { path: PATHS.auth.login, element: <LoginPage /> },
    ],
  },
] as RouteObject[]
