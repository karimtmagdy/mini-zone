import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// import { NavLink, useLocation } from "react-router-dom";
// import { cn } from "@/lib/utils";
import { NavItem } from "@/components/ui/nav-item";
export default function NavMain({
  main,
}: {
  main: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  // const location = useLocation();
  // const is = main
  //   .flatMap((item) => item.items)
  //   .filter((item) => item?.url === location.pathname);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {main.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      {/* <NavLink to={subItem.url} end>
                        {({ isActive }) => (
                          <SidebarMenuSubButton asChild>
                            <div
                              className={cn(
                                isActive &&
                                  is &&
                                  "!bg-foreground hover:!text-background active:[&>svg]:!text-background active:!text-background [&>svg]:!text-background !text-background hover:[&>svg]:!text-background font-semibold",
                              )}
                            >
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </div>
                          </SidebarMenuSubButton>
                        )}
                      </NavLink> */}
                      <NavItem to={subItem.url}>
                        <SidebarMenuSubButton asChild>
                          <div>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </div>
                        </SidebarMenuSubButton>
                      </NavItem>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

