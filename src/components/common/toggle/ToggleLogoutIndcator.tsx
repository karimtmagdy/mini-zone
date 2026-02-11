import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export default function ToggleLogoutIndcator() {
  return (
    <Button
      asChild
      className="w-full justify-start px-2"
      size="sm"
      variant="secondary"
    >
      <DropdownMenuItem>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </Button>
  );
}
