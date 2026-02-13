import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Icon } from "@/assets/icon/icons";

export default function CrudSidebar({
  settingsMenuItems,
  isSettingsOpen,
  isSettingsActive,
  setIsSettingsOpen,
}: {
  settingsMenuItems: any[];
  isSettingsOpen: boolean;
  isSettingsActive: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}) {
  return (
    <SidebarMenu>

    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip="Settings"
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        isActive={isSettingsOpen || isSettingsActive}
        className={isSettingsOpen || isSettingsActive ? "text-primary" : ""}
      >
        <Icon.SettingsIcon className="h-5 w-5" />
        <span>Settings</span>
        <Icon.ChevronDownIcon
          className={cn(
            "ml-auto h-4 w-4 transition-transform",
            isSettingsOpen || isSettingsActive ? "rotate-180" : "",
          )}
        />
      </SidebarMenuButton>

      {(isSettingsOpen || isSettingsActive) && (
        <SidebarMenuSub>
          {settingsMenuItems.map((item) => (
            <SidebarMenuSubItem key={item.title}>
              <NavLink to={item.url} end>
                {({ isActive }) => (
                  <SidebarMenuSubButton
                    asChild
                    isActive={isActive}
                    className={isActive ? "text-primary" : ""}
                  >
                    <div>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuSubButton>
                )}
              </NavLink>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
    </SidebarMenu>
  );
}
