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
        <div className="">
          {/* <div className="relative flex min-h-screen w-full overflow-hidden"> */}
          <main className="relative z-10 flex min-h-full flex-1 flex-col p-4 md:p-8">
            {/* <main className=" "> */}
            {/* <div className="mx-auto w-full max-w-7xl"> */}
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
