import { UserCircleIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { PATHS } from "@/lib/router/basic.routes"
import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
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
import {
  ACCOUNT_MENU,
  type IAccountMenuItem,
} from "@/features/auth/model/auth.menu"
import { LogoutMenuItem } from "../sidebar/LogoutMenuItem"

export function TriggerAuth() {
  const navigate = useNavigate()
  const { data: account } = useCurrentAccount()

  if (!account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="icon-xs"
              aria-label="Sign in"
              title="Sign in"
            >
              <UserCircleIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
          <DropdownMenuGroup className="*:justify-center">
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

  const items: IAccountMenuItem[] = account.role
    ? ACCOUNT_MENU[account.role]
    : [{ label: "Setup Admin", url: PATHS.auth.setup_admin }]

  const onSelect = (item: IAccountMenuItem) => {
    if (item.url) navigate(item.url)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            className="rounded-full"
            aria-label={`${account.user.username} account`}
            title={`${account.user.username} account`}
          >
            <Avatar size="sm">
              <AvatarFallback>
                {getInitials(account.user.username)}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align="end" side="bottom" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{account.user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => (
            <DropdownMenuItem key={item.label} onClick={() => onSelect(item)}>
              {item.label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <LogoutMenuItem />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
