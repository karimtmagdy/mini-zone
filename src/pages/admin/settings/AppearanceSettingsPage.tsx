import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sun, Moon, Monitor, Type, Maximize2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState("system");

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

      <div className="space-y-8">
        <div>
          <Label className="mb-4 block text-sm font-bold">Interface Mode</Label>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                id: "light",
                name: "Light Mode",
                icon: Sun,
                desc: "Classic high-contrast",
              },
              {
                id: "dark",
                name: "Dark Nebula",
                icon: Moon,
                desc: "Eye-soothing professional",
              },
              {
                id: "system",
                name: "Dynamic Sync",
                icon: Monitor,
                desc: "Follow OS preferences",
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={cn(
                  "relative flex flex-col gap-3 rounded-xl border-2 p-4 text-left transition-all",
                  theme === t.id
                    ? "border-primary bg-primary/5 shadow-inner"
                    : "bg-muted/20 hover:bg-muted/40 border-transparent",
                )}
              >
                {theme === t.id && (
                  <div className="bg-primary text-primary-foreground absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <t.icon
                  className={cn(
                    "h-6 w-6",
                    theme === t.id ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <div>
                  <p className="text-sm font-bold">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 border-t pt-8">
          <div>
            <Label className="mb-2 block text-sm font-bold">
              Typography scale
            </Label>
            <div className="flex items-center gap-4">
              <Type className="h-4 w-4 opacity-50" />
              <div className="bg-muted h-2 flex-1 overflow-hidden rounded-full">
                <div className="bg-primary h-full w-[60%]" />
              </div>
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
              <Maximize2 className="h-5 w-5" />
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
