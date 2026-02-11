import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function ApplicationSidebar({
  mainNavigation,
}: {
  mainNavigation: any[];
}) {
  return (
    <SidebarMenu className="gap-1">
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      {mainNavigation.map((item) => (
        <SidebarMenuItem key={item.title}>
          <NavLink
            to={item.url}
            end={true}
            className="flex w-full items-center"
          >
            {({ isActive }) => (
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className={cn(isActive ? "text-primary" : "")}
              >
                <div>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            )}
          </NavLink>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
