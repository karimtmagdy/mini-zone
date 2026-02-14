import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthGetMe } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

export default function UserAvatar({ className }: { className?: string }) {
  const { user } = useAuthGetMe();
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={user?.image?.secureUrl} alt={user?.slug} />
      <AvatarFallback>
        {user?.username?.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
