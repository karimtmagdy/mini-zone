import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import TopSidebar from "./TopSidebar";
import ButtomSideBar from "./ButtomSideBar";
import NavProjects from "./NavProjects";
import NavMain from "./NavMain";
import { data } from "@/lib/links/data-sidebar-admin";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <TopSidebar teams={data.teams} />
      <SidebarContent>
        <NavMain main={data.main} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <ButtomSideBar user={data.user} />
      <SidebarRail />
    </Sidebar>
  );
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
