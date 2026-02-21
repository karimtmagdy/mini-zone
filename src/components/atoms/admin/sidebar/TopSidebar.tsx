import * as React from "react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function TopSidebar({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {teams.map((item, index) => (
            <SidebarMenuButton
              key={index}
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <item.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{item.name}</span>
                <span className="truncate text-xs">{item.plan}</span>
              </div>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
