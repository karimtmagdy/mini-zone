import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { hasPermission } from "@/features/auth/model/auth.permission"

interface IRequireGuestProps {
  children: ReactNode
}

/** Blocks the auth routes (login/register) for users who are already signed in. */
export function RequireGuest({ children }: IRequireGuestProps) {
  const { data: account } = useCurrentAccount()

  if (!account) return <>{children}</>

  if (account.role === "customer") {
    return <Navigate to={PATHS.auth.setup_admin} replace />
  }

  if (account.role === "employee" || account.role === "supplier") {
    if (!hasPermission(account, "employee:create")) {
      return <Navigate to={PATHS.auth.setup_admin} replace />
    }
    return <Navigate to={PATHS.panel.base} replace />
  }

  return <Navigate to={PATHS.base} replace />
}
