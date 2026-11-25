import { Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function TriggerLanguage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            size="icon-xs"
            variant="outline"
            aria-label="Switch language"
            title="Switch language"
          >
            <Languages />
          </Button>
        }
      />
      <DropdownMenuContent
        side="bottom"
        sideOffset={8}
        align="end"
        className="min-w-10"
      >
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup className="*:flex *:size-8 *:items-center *:justify-center *:p-0.5">
            <DropdownMenuRadioItem value="ar">ar</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">en</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
