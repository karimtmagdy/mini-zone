import { useNavigate } from "react-router-dom"
import {
  BellIcon,
  ChevronsUpDownIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserCogIcon,
  UserIcon,
  type LucideIcon,
} from "lucide-react"

import { PATHS, panelUrl } from "@/lib/router/basic.routes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { LogoutMenuItem } from "@/components/sidebar/LogoutMenuItem"
import { UserAvatar } from "@/components/sidebar/UserAvatar"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { usePermission } from "@/features/auth/hooks/use-permission"
import { PANEL_ROLES } from "@/features/auth/model/auth.menu"

interface INavUserItem {
  label: string
  url: string
  icon: LucideIcon
}

/** shadcn-style account menu pinned to the sidebar footer. */
export function NavUser() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const { data: account } = useCurrentAccount()
  const { can } = usePermission()

  const username = account?.user.username ?? "Guest"
  const email = account?.user.email ?? "Not signed in"
  const role = account?.role ?? null

  const workspace: INavUserItem[] = []
  if (role && PANEL_ROLES.includes(role)) {
    workspace.push({
      label: "Dashboard",
      url: PATHS.panel.base,
      icon: LayoutDashboardIcon,
    })
  }
  if (can("employee:read")) {
    workspace.push({
      label: "Employees",
      url: panelUrl(PATHS.panel.employees),
      icon: UserCogIcon,
    })
  }

  const settings: INavUserItem[] = [
    { label: "Profile", url: PATHS.settings.profile, icon: UserIcon },
    { label: "Account", url: PATHS.settings.account, icon: SettingsIcon },
    {
      label: "Notifications",
      url: PATHS.settings.notifications,
      icon: BellIcon,
    },
  ]

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent"
              >
                <UserAvatar username={username} />
                <div className="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-medium">{username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {email}
                  </span>
                </div>
                <ChevronsUpDownIcon className="ms-auto size-4 group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            }
          />
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                  <UserAvatar username={username} />
                  <div className="grid flex-1 text-start text-sm leading-tight">
                    <span className="truncate font-medium">{username}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>

            {workspace.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {workspace.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      onClick={() => navigate(item.url)}
                    >
                      <item.icon />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {settings.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => navigate(item.url)}
                >
                  <item.icon />
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <LogoutMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
