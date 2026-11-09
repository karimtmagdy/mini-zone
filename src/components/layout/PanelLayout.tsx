import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { HeaderPanel } from "../header/HeaderPanel"
import { AppSidebar } from "../sidebar/AppSidebar"

export function PanelLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderPanel />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
