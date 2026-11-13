import { TriggerAuth } from "./TriggerAuth"
import { TriggerCart } from "./TriggerCart"
import { TriggerNotifications } from "./TriggerNotifications"
import { TriggerPanel } from "./TriggerPanel"
import { TriggerTheme } from "./TriggerTheme"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { PANEL_ROLES } from "@/features/auth/model/auth.menu"

export function TriggersToolbar() {
  const { data: account } = useCurrentAccount()
  const canAccessPanel = account?.role
    ? PANEL_ROLES.includes(account.role)
    : false

  return (
    <div className="ml-auto flex gap-x-1">
      <TriggerCart />
      <TriggerNotifications />
      <TriggerTheme />
      {canAccessPanel && <TriggerPanel />}
      <TriggerAuth />
    </div>
  )
}
