import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PATH_SIGNIN, PATH_SIGNUP } from "@/lib/links/paths.routes";
import { useNavigate } from "react-router-dom";
import { useAuthGetMe } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Icon } from "@/assets/icon/icons";
import ToggleLogoutIndcator from "./ToggleLogoutIndcator";
export default function ToggleUserMenuIndicator() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthGetMe();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User Menu">
            {isAuthenticated && user ? (
              <Avatar>
                <AvatarFallback>
                  {user?.username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
                <AvatarImage src={user?.image?.secureUrl} alt={user?.slug} />
              </Avatar>
            ) : (
              <Icon.UserCircleIcon />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn(isAuthenticated ? "w-56" : "w-20", "space-y-1")}
          align="end"
          sideOffset={10}
        >
          {isAuthenticated && user ? (
            <>
              <DropdownMenuItem className="flex items-center gap-2">
                <Icon.UserIcon />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2">
                <Icon.CogIcon />
                Settings
              </DropdownMenuItem>
              <ToggleLogoutIndcator />
            </>
          ) : (
            <>
              <DropdownMenuItem
                className="flex justify-center"
                onClick={() => navigate(PATH_SIGNIN)}
              >
                Login
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex justify-center"
                onClick={() => navigate(PATH_SIGNUP)}
              >
                Register
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
