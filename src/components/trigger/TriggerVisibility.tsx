import { Eye, EyeOff } from "lucide-react"
import { InputGroupButton } from "@/components/ui/input-group"

type TriggerVisibilityProps = {
  show: boolean
  toggle: () => void
}

export function TriggerVisibility({ show, toggle }: TriggerVisibilityProps) {
  return (
    <InputGroupButton onClick={toggle} size="icon-xs">
      {show ? <Eye /> : <EyeOff />}
    </InputGroupButton>
  )
}
