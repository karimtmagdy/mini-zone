import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Icon } from "@/assets/icon/icons";
import { Progress } from "@/components/ui/progress";
import AppearanceChoiceCardTheme from "@/components/common/AppearanceChoiceCardTheme";

export default function AppearanceSettingsPage() {
  return (
    <div className="space-y-10">
      <AppearanceHeader />
      <AppearanceChoiceCardTheme />
      <div className="space-y-8">
        <VisualPreferenceSection />
        <FullscreenExperienceToggle />
      </div>
    </div>
  );
}

function AppearanceHeader() {
  return (
    <div>
      <h2 className="mb-1 text-xl font-bold italic">
        Theme & Visual Experience
      </h2>
      <p className="text-muted-foreground text-sm">
        Customize how you see the world of Mini-Zone.
      </p>
    </div>
       
  );
}

function VisualPreferenceSection() {
  return (
    <div className="space-y-6 border-t pt-8">
      <div>
        <Label className="mb-2 block text-sm font-bold">Typography scale</Label>
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
  );
}

function FullscreenExperienceToggle() {
  return (
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
  );
}
