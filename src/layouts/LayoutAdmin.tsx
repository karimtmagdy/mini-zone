import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/sidebar/app-sidebar";
import { AdminHeader } from "@/components/common/header/AdminHeader";

export default function LayoutAdmin() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AdminHeader />
        {/* <div className="*:@lg:bg-red-950 *:@xl:bg-blue-950 *:@2xl:bg-green-950 *:@3xl:bg-amber-950 *:@4xl:bg-amber-950 *:@5xl:bg-amber-950 *:@6xl:bg-amber-950"> */}
          <main className="@container flex min-w-full flex-1 flex-col p-4 md:p-8 overflow-hidden">
            {/* <main className="relative z-10  min-h-full     "> */}
            <Outlet />
            {/* </main> */}
          </main>
        {/* </div> */}
      </SidebarInset>
    </SidebarProvider>
  );
}
