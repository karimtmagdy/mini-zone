import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export function TriggerTheme() {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon-xs"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}
