import * as React from "react";

import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";

import TopSidebar from "./TopSidebar";
import NavUser from "./NavUser";
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
      <NavUser />
      <SidebarRail />
    </Sidebar>
  );
}
 