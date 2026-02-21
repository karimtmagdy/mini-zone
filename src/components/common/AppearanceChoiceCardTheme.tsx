import { useTheme, type Theme } from "@/context/ThemeContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Icon } from "@/assets/icon/icons";
import { Label } from "@/components/ui/label";

const themeOptions = [
  {
    id: "light" as const,
    name: "Light Mode",
    icon: Icon.SunIcon,
    desc: "Classic high-contrast brightness",
  },
  {
    id: "dark" as const,
    name: "Dark Mode",
    icon: Icon.MoonIcon,
    desc: "Eye-soothing professional dark theme",
  },
  {
    id: "system" as const,
    name: "System",
    icon: Icon.MonitorIcon,
    desc: "Follow your OS preferences",
  },
];
export default function AppearanceChoiceCardTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-1">
      <Label className="mb-4 block text-sm font-bold">Theme Preference</Label>
      <RadioGroup
        value={theme}
        onValueChange={(value) => setTheme(value as Theme)}
        className="flex flex-col @2xl:flex-row"
      >
        {themeOptions.map((option) => (
          <FieldLabel key={option.id} htmlFor={option.id}>
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle className="flex items-center gap-2">
                  <option.icon />
                  {option.name}
                </FieldTitle>
                <FieldDescription>{option.desc}</FieldDescription>
              </FieldContent>
              <RadioGroupItem value={option.id} id={option.id} />
            </Field>
          </FieldLabel>
        ))}
      </RadioGroup>
    </div>
  );
}
