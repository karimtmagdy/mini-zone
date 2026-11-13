import { PATHS } from "@/lib/router/basic.routes"
import type { UserRole } from "@/features/auth/model/auth.entity"

export interface IAccountMenuItem {
  label: string
  url?: string
}

/**
 * Profile-dropdown entries per role.
 * Edit this single map to change the account menu.
 */
export const ACCOUNT_MENU: Record<UserRole, IAccountMenuItem[]> = {
  customer: [
    { label: "Profile" },
    { label: "My Orders" },
    { label: "Wishlist" },
  ],
  employee: [
    { label: "Profile" },
    { label: "Dashboard", url: PATHS.panel.base },
    { label: "Employees" },
  ],
  supplier: [
    { label: "Profile" },
    { label: "My Products" },
    { label: "Orders" },
  ],
}

/** Roles allowed to open the staff panel. */
export const PANEL_ROLES: readonly UserRole[] = ["employee", "supplier"]
