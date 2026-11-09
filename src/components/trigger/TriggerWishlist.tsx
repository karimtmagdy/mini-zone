import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TriggerWishlist() {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button size="icon" variant="outline" aria-label="Wishlist">
            <Heart />
          </Button>
        }
      />
      <TooltipContent sideOffset={14}>Wishlist</TooltipContent>
    </Tooltip>
  )
}
