import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import type { UserRole } from "@/features/auth/model/auth.entity"

interface IRequireRoleProps {
  /** Roles allowed to open the route. */
  roles: readonly UserRole[]
  children: ReactNode
}

/** Blocks a route unless the signed-in account owns one of `roles`. */
export function RequireRole({ roles, children }: IRequireRoleProps) {
  const { data: account } = useCurrentAccount()

  if (!account) return <Navigate to={PATHS.auth.login} replace />

  if (!account.role || !roles.includes(account.role))
    return <Navigate to={PATHS.error.forbidden} replace />

  return <>{children}</>
}
