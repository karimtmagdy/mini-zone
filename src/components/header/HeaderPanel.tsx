import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
 import { HeaderRoot } from "./HeaderRoot"
import { BreadcrumbRouter } from "./BreadcrumbRouter"
import { TriggersToolbar } from "../trigger/TriggersToolbar"

export function HeaderPanel() {
  return (
    <HeaderRoot>
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="my-4 mr-2 data-[orientation=vertical]:h-4"
        />
        <BreadcrumbRouter />
      </div>
      <TriggersToolbar />
    </HeaderRoot>
  )
}
