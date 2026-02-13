import { Button } from "@/components/ui/button";
import { Icon } from "@/assets/icon/icons";
import { useTheme } from "@/context/ThemeContext";
export default function ToggleThemeIndicator() {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      name="toggle-theme-indicator"
      aria-label="toggle-theme-indicator"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <Icon.SunIcon /> : <Icon.MoonIcon />}
    </Button>
  );
}
