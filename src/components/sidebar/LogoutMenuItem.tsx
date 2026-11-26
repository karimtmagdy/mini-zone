import { LogOutIcon } from "lucide-react"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useAuthLogout } from "@/features/auth/hooks/use-auth-logout"

/** Destructive "Log out" entry for account dropdown menus. */
export function LogoutMenuItem() {
  const { logout, mutation } = useAuthLogout()

  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={mutation.isPending}
      onClick={logout}
    >
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  )
}
