import { Button } from "@/components/ui/button";
import RootHeader from "./RootHeader";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import BreadcrumbHeader from "@/components/admin/sidebar/BreadcrumbSidebar";
import {
  ToggleAdminIndicator,
  ToggleThemeIndicator,
  ToggleUserMenuIndicator,
} from "../toggle";
import { Icon } from "@/assets/icon/icons";

export function AdminHeader() {
  return (
    <RootHeader>
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="my-auto data-[orientation=vertical]:h-5"
        />
        <BreadcrumbHeader />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          name="help-button"
          aria-label="help-button"
        >
          <Icon.HelpCircleIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden @xl:inline-flex"
          name="settings-button"
          aria-label="settings-button"
        >
          <Icon.SettingsIcon className="h-4 w-4" />
        </Button>
        <ToggleThemeIndicator />
        <ToggleUserMenuIndicator />
        <ToggleAdminIndicator />
      </div>
    </RootHeader>
  );
}
