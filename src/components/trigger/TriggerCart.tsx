import { ShoppingBag } from "lucide-react"
import { Button } from "../ui/button"

export function TriggerCart() {
  return (
    <Button variant="outline" size="icon-xs">
      <ShoppingBag />
    </Button>
  )
}
