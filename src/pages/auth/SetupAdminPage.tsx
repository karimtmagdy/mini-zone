import { Navigate } from "react-router-dom"

import {
  SetupAdminForm,
  SetupAdminGate,
} from "@/features/auth/components/setup-admin-form"
import { authSession } from "@/features/auth/api/auth.session"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { hasPermission } from "@/features/auth/model/auth.permission"
import { PATHS, panelUrl } from "@/lib/router/basic.routes"

/**
 * `/auth/setup-admin`
 * - guests → sign-in gate
 * - users without `employee:create` → bootstrap form (even if role is employee)
 * - users who already have create permission → employees page
 */
export function SetupAdminPage() {
  const hasToken = Boolean(authSession.getToken())
  const { data: account, isLoading } = useCurrentAccount()
  const canCreate = hasPermission(account, "employee:create")

  if (!hasToken) return <SetupAdminGate />

  if (isLoading && !account) {
    return (
      <p className="text-sm text-muted-foreground">Checking your session…</p>
    )
  }

  // Only skip setup when the account already has admin hiring power.
  if (canCreate) {
    return <Navigate to={panelUrl(PATHS.panel.employees)} replace />
  }

  return <SetupAdminForm />
}
