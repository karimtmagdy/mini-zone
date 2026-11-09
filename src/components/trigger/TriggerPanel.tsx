import { Home, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "@/lib/router/basic.routes";

export function TriggerPanel() {
  const navigate = useNavigate();
  const location = useLocation();

  const isPanelActive = location.pathname.includes(PATHS.panel.base);
  const navTo = () => navigate(isPanelActive ? PATHS.base : PATHS.panel.base);

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon-xs" onClick={() => navTo()}>
            {isPanelActive ? <Home /> : <Shield />}
          </Button>
        }
      />
      <TooltipContent sideOffset={14}>
        Go to {isPanelActive ? "Website" : "Panel"}
      </TooltipContent>
    </Tooltip>
  );
}
