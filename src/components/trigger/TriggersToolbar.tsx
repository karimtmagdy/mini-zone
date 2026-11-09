// import { TriggerAuth } from "./TriggerAuth";
// import { PATHS } from "@/lib/router/basic.routes"
import { TriggerAuth } from "./TriggerAuth"
import { TriggerCart } from "./TriggerCart"
import { TriggerNotifications } from "./TriggerNotifications"
import { TriggerPanel } from "./TriggerPanel"
import { TriggerTheme } from "./TriggerTheme"
// import { useCurrentAccount } from "@/modules/auth/services/current-account.service";

export function TriggersToolbar() {
  // const account = useCurrentAccount();
  return (
    <div className="ml-auto flex gap-x-1">
      <TriggerCart />
      <TriggerNotifications />
      <TriggerTheme />
      <TriggerPanel />
      {/* {account?.data?.role === "admin" && <TriggerPanel />} */}
      <TriggerAuth />
    </div>
  )
}
