import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Icon } from "@/assets/icon/icons";
import { useTheme, type Theme } from "@/context/ThemeContext";
import { Progress } from "@/components/ui/progress";
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

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-1 text-xl font-bold italic">
          Theme & Visual Experience
        </h2>
        <p className="text-muted-foreground text-sm">
          Customize how you see the world of Mini-Zone.
        </p>
      </div>

      <RadioGroupChoiceCardTheme />

      <div className="space-y-8">
        <div className="space-y-6 border-t pt-8">
          <div>
            <Label className="mb-2 block text-sm font-bold">
              Typography scale
            </Label>
            <div className="flex items-center gap-4">
              <Icon.TypeIcon className="h-4 w-4 opacity-50" />
              <Progress value={50} />
              <span className="font-mono text-xs font-bold">110%</span>
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm font-bold">
              Density preference
            </Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 rounded-full text-[10px]"
              >
                COMPACT
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="border-primary/20 h-7 rounded-full border text-[10px]"
              >
                BALANCED
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 rounded-full text-[10px]"
              >
                SPACIOUS
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-8">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg">
              <Icon.Maximize2Icon className="h-5 w-5" />
            </div>
            <div className="text-sm">
              <p className="font-bold">Fullscreen Experience</p>
              <p className="text-muted-foreground text-xs">
                Enter immersive mode automatically on startup
              </p>
            </div>
          </div>
          <button className="bg-muted relative h-6 w-11 rounded-full transition-all">
            <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}

function RadioGroupChoiceCardTheme() {
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
