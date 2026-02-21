import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Icon } from "@/assets/icon/icons";
import { useAuthFormLogout } from "@/hooks/use-auth";
export default function ToggleLogoutIndcator() {
  const { onSubmit, logoutMutation } = useAuthFormLogout();
  return (
    <form>
      <Button
        type="submit"
        className="w-full justify-start px-2"
        size="sm"
        variant="secondary"
        disabled={logoutMutation.isPending}
        asChild
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <DropdownMenuItem>
          <Icon.LogOutIcon />
          {logoutMutation.isPending ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </Button>
    </form>
  );
}
