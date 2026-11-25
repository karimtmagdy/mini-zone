import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/features/auth/model/auth.permission"
import type { Permission } from "@/features/auth/model/auth.entity"

/** Permission helpers bound to the signed-in account. */
export function usePermission() {
  const { data: account } = useCurrentAccount()

  return {
    account,
    can: (permission: Permission) => hasPermission(account, permission),
    canAny: (permissions: readonly Permission[]) =>
      hasAnyPermission(account, permissions),
    canAll: (permissions: readonly Permission[]) =>
      hasAllPermissions(account, permissions),
  }
}
