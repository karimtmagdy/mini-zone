import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"
import type { NavItemData } from "@/types/types"
import { NavItem } from "../ui/nav-item"
import { usePermission } from "@/features/auth/hooks/use-permission"
import type { Permission } from "@/features/auth/model/auth.entity"

function filterNav(
  items: NavItemData[],
  canAny: (permissions: readonly Permission[]) => boolean
): NavItemData[] {
  return items
    .map((item) => {
      const children = item.items
        ? filterNav(item.items, canAny)
        : undefined

      if (item.anyOf?.length && !canAny(item.anyOf as Permission[])) {
        return null
      }

      if (children) {
        if (children.length === 0 && (!item.url || item.url === "#")) {
          return null
        }
        return { ...item, items: children }
      }

      return item
    })
    .filter((item): item is NavItemData => item !== null)
}

export function NavMain({ items }: { items: NavItemData[] }) {
  const { canAny } = usePermission()
  const visible = filterNav(items, canAny)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-0.5">
        {visible.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
