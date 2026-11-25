import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { authSession } from "@/features/auth/api/auth.session"

interface IRequireAuthProps {
  children: ReactNode
}

/** Blocks a route unless an access token / account is available. */
export function RequireAuth({ children }: IRequireAuthProps) {
  const hasToken = Boolean(authSession.getToken())
  const { data: account, isLoading } = useCurrentAccount()

  if (!hasToken) return <Navigate to={PATHS.auth.login} replace />
  if (isLoading && !account) return null
  if (!account) return <Navigate to={PATHS.auth.login} replace />

  return <>{children}</>
}
