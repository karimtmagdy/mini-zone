import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { PropsWithId } from "@/contract/global.dto";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, formatShortDate } from "@/lib/date";
import type { UserDto } from "@/contract/user.dto";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";

interface ViewUserProps extends PropsWithId {
  data: UserDto[];
}

export default function ViewUser({
  id,
  open,
  onOpenChange,
  data,
}: ViewUserProps) {
  const user = data?.find((b) => b.id === id);

  if (!user) return null;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Viewing profile for {user.username}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted border-border/50 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2">
              {user.image?.url ? (
                <img
                  src={user.image.url}
                  alt={user.username}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <Icon.UserIcon className="text-muted-foreground/40 h-10 w-10" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {user.name ? `${user.name.first} ${user.name.last}` : user.username}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  {user.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">{user.role}</Badge>
                <Badge
                  variant={
                    user.status === "active"
                      ? "default"
                      : user.status === "banned"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {user.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 grid grid-cols-2 gap-x-8 gap-y-6 rounded-lg border p-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Username
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.AtSignIcon className="text-primary h-4 w-4" />
                <span>{user.username}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Account Created
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.CalendarIcon className="text-primary h-4 w-4" />
                <span>{formatShortDate(user.createdAt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Last Active
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.ClockIcon className="text-primary h-4 w-4" />
                <span>{formatRelativeTime(new Date(user.updatedAt))}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                User ID
              </p>
              <div className="mt-1 flex items-center gap-2">
                <code className="bg-muted rounded p-1 font-mono text-[10px] break-all">
                  {user.id}
                </code>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
