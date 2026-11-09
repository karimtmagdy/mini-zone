import { Button } from "../ui/button"
import { UserCircleIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

export function TriggerAuth() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon-xs">
            <UserCircleIcon />
          </Button>
        }
      />
      <TooltipContent sideOffset={17}>account</TooltipContent>
    </Tooltip>
  )
}
