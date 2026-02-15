import { useAuthGetMe } from "@/hooks/use-auth";

export default function AdminInformation() {
  const { user } = useAuthGetMe();
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{user?.username}</span>
      <span className="truncate text-xs">{user?.email}</span>
    </div>
  );
}
