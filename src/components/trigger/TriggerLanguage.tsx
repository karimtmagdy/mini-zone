import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export function TriggerLanguage() {
  return (
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <TooltipTrigger
              render={
                <Button size="icon-xs" variant="outline" aria-label="Switch Lang">
                  <Languages />
                </Button>
              }
            />
          }
        />
        <TooltipContent sideOffset={14}>Switch language</TooltipContent>
        <DropdownMenuContent
          sideOffset={14}
          className="min-w-10"
          alignOffset={-8}
        >
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup className="*:flex *:size-8 *:items-center *:justify-center *:p-0.5">
              <DropdownMenuRadioItem value="ar">ar</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="en">en</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  )
}
