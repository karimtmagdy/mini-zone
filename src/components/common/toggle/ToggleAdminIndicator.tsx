import { useNavigate, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/assets/icon/icons";
export default function ToggleAdminIndicator() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const isInAdmin = pathname.includes("admin");
  //   if (isInAdmin) {
  //     navigate("/");
  //   } else {
  //     navigate("/admin");
  //   }

  return (
    <Tooltip>
      <TooltipTrigger
        name="toggle-admin-indicator"
        aria-label="toggle-admin-indicator"
        className="hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground flex size-9 items-center justify-center rounded-md"
        onClick={() => {
          if (isInAdmin) {
            navigate("/");
          } else {
            navigate("/admin");
          }
        }}
      >
        {isInAdmin ? (
          <Icon.HomeIcon className="h-4 w-4" />
        ) : (
          <Icon.ShieldIcon className="h-4 w-4" />
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>Go to {isInAdmin ? "Website" : "Admin"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
