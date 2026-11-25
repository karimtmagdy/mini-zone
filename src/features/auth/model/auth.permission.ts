import type {
  CurrentAccount,
  Permission,
} from "@/features/auth/model/auth.entity"

export function hasPermission(
  account: CurrentAccount | null | undefined,
  permission: Permission
): boolean {
  return Boolean(account?.permissions.includes(permission))
}

export function hasAnyPermission(
  account: CurrentAccount | null | undefined,
  permissions: readonly Permission[]
): boolean {
  if (!account || permissions.length === 0) return false
  return permissions.some((permission) =>
    account.permissions.includes(permission)
  )
}

export function hasAllPermissions(
  account: CurrentAccount | null | undefined,
  permissions: readonly Permission[]
): boolean {
  if (!account || permissions.length === 0) return false
  return permissions.every((permission) =>
    account.permissions.includes(permission)
  )
}
