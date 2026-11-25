import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import {
  hasAllPermissions,
  hasAnyPermission,
} from "@/features/auth/model/auth.permission"
import type { Permission } from "@/features/auth/model/auth.entity"

interface IRequirePermissionProps {
  /** Require every listed permission. */
  all?: readonly Permission[]
  /** Require at least one listed permission. */
  any?: readonly Permission[]
  children: ReactNode
}

/** Blocks a route unless the signed-in account owns the required permissions. */
export function RequirePermission({
  all,
  any,
  children,
}: IRequirePermissionProps) {
  const { data: account } = useCurrentAccount()

  if (!account) return <Navigate to={PATHS.auth.login} replace />

  const okAll = !all || hasAllPermissions(account, all)
  const okAny = !any || hasAnyPermission(account, any)

  if (!okAll || !okAny) {
    return <Navigate to={PATHS.error.forbidden} replace />
  }

  return <>{children}</>
}
