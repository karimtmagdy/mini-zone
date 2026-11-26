import { getInitials } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/** Compact avatar showing the user's initials. */
export function UserAvatar({ username }: { username: string }) {
  return (
    <Avatar size="sm">
      <AvatarFallback>{getInitials(username)}</AvatarFallback>
    </Avatar>
  )
}
