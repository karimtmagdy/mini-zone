import { UserCircleIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { useAuthLogout } from "@/features/auth/hooks/use-auth-logout"
import {
  ACCOUNT_MENU,
  type IAccountMenuItem,
} from "@/features/auth/model/auth.menu"

function getInitials(username: string) {
  const parts = username.split(/[\s._-]+/).filter(Boolean)
  const initials = parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")

  return (initials || username.slice(0, 2)).toUpperCase()
}

export function TriggerAuth() {
  const navigate = useNavigate()
  const { data: account } = useCurrentAccount()
  const { logout, mutation } = useAuthLogout()

  if (!account) {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger
            render={
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="icon-xs">
                    <UserCircleIcon />
                  </Button>
                }
              />
            }
          />
          <TooltipContent sideOffset={17}>Sign in</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate(PATHS.auth.login)}>
              Login
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(PATHS.auth.register)}>
              Register
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const items = account.role ? ACCOUNT_MENU[account.role] : []

  const onSelect = (item: IAccountMenuItem) => {
    if (item.url) navigate(item.url)
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-xs" className="rounded-full">
                  <Avatar size="sm">
                    <AvatarFallback>
                      {getInitials(account.user.username)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
          }
        />
        <TooltipContent sideOffset={17}>
          {account.user.username} account
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{account.user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem key={item.label} onClick={() => onSelect(item)}>
              {item.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={mutation.isPending}
            onClick={logout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
