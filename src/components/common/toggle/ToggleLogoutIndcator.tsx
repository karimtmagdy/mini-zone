import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Icon } from "@/assets/icon/icons";
export default function ToggleLogoutIndcator() {
  return (
    <Button
      asChild
      className="w-full justify-start px-2"
      size="sm"
      variant="secondary"
    >
      <DropdownMenuItem>
        <Icon.LogOutIcon />
        Log out
      </DropdownMenuItem>
    </Button>
  );
}
