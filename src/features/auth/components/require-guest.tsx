import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"

interface IRequireGuestProps {
  children: ReactNode
}

/** Blocks the auth routes (login/register) for users who are already signed in. */
export function RequireGuest({ children }: IRequireGuestProps) {
  const { data: account } = useCurrentAccount()

  if (account) return <Navigate to={PATHS.base} replace />

  return <>{children}</>
}
