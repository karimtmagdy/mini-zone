import { useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
export default function ToggleAdminIndicator() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isInAdmin = pathname.includes("admin");

  return (
    <Tooltip>
      <TooltipTrigger
        asChild
        name="toggle-admin-indicator"
        aria-label="toggle-admin-indicator"
        onClick={() => {
          if (isInAdmin) {
            navigate("/");
          } else {
            navigate("/admin");
          }
        }}
      >
        <Button variant="ghost" size="icon">
          {isInAdmin ? <Icon.HomeIcon /> : <Icon.ShieldIcon />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Go to {isInAdmin ? "Website" : "Admin"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
