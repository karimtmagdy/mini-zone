import * as React from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { NavItemData } from "@/types/types"
import { PATHS } from "@/lib/router/basic.routes"

function normalizeUrl(url: string): string {
  if (url === "#") return "#"
  // Remove multiple slashes and ensure it starts with /admin if it's a relative path
  if (!url || url.startsWith("/")) return url
  return `${PATHS.panel.base}/${url}`.replace(/\/+/g, "/")
}

function checkActive(item: NavItemData, pathname: string): boolean {
  const fullUrl = normalizeUrl(item.url ?? "")
  if (fullUrl !== "#" && pathname === fullUrl) return true
  if (item.items) {
    return item.items.some((sub) => checkActive(sub, pathname))
  }
  return false
}

export function NavItem({
  item,
  level = 0,
}: {
  item: NavItemData
  level?: number
}) {
  const location = useLocation()
  const hasSubItems = item.items && item.items.length > 0
  const Icon = item.icon

  const fullUrl = React.useMemo(() => normalizeUrl(item.url ?? ""), [item.url])

  const isDirectActive = React.useMemo(
    () => fullUrl !== "#" && location.pathname === fullUrl,
    [fullUrl, location.pathname]
  )
  const isAnyChildActive = React.useMemo(
    () => item.items?.some((sub) => checkActive(sub, location.pathname)),
    [item.items, location.pathname]
  )
  const isActive = isDirectActive || isAnyChildActive

  const [isOpen, setIsOpen] = React.useState(() => {
    const stored = localStorage.getItem(`sidebar-open-${item.title}`)
    if (stored !== null) return stored === "true"
    return item.isActive || isAnyChildActive
  })

  React.useEffect(() => {
    localStorage.setItem(`sidebar-open-${item.title}`, String(isOpen))
  }, [isOpen, item.title])

  if (!hasSubItems) {
    if (level === 0) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton
            render={<NavLink to={fullUrl} />}
            isActive={isDirectActive}
            tooltip={item.title}
          >
            {Icon && <Icon />}
            <span className="whitespace-nowrap">{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )
    }
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton
          render={<NavLink to={fullUrl} />}
          isActive={isDirectActive}
        >
          {Icon && <Icon />}
          <span className="whitespace-nowrap">{item.title}</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  const Content = (
    <Collapsible
      key={item.title}
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/item"
    >
      <CollapsibleTrigger
        render={
          level === 0 ? (
            <SidebarMenuButton isActive={isActive} />
          ) : (
            <SidebarMenuSubButton isActive={isActive} />
          )
        }
      >
        {Icon && <Icon />}
        <span className="whitespace-nowrap">{item.title}</span>
        <ChevronRightIcon
          className={cn(
            // className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
            "ms-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/item:rotate-90 group-data-open/item:rotate-90"
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items?.map((subItem) => (
            <NavItem key={subItem.title} item={subItem} level={level + 1} />
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )

  return level === 0 ? (
    <SidebarMenuItem>{Content}</SidebarMenuItem>
  ) : (
    <SidebarMenuSubItem>{Content}</SidebarMenuSubItem>
  )
}
