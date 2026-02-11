import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Smartphone, History, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-1 text-xl font-bold italic">
          Security & Infrastructure
        </h2>
        <p className="text-muted-foreground text-sm">
          Maintain the integrity of your administrative access.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/30 flex items-center justify-between rounded-xl border border-dashed p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Two-Factor Authentication</p>
              <p className="text-muted-foreground text-xs">
                Currently active via Google Authenticator
              </p>
            </div>
          </div>
          <Badge variant="success">Active</Badge>
        </div>

        <div className="space-y-4">
          <h3 className="text-muted-foreground text-sm font-bold tracking-wider uppercase">
            Access Control
          </h3>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Current Administrative Key</Label>
              <Input type="password" value="••••••••••••••••" disabled />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <KeyRound className="h-3.5 w-3.5" /> Rotate Password
            </Button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
            Device Authorization
          </h3>
          <div className="space-y-3">
            {[
              { device: "MacBook Pro 16", loc: "New York, USA", date: "Now" },
              {
                device: "iPhone 15 Pro",
                loc: "New York, USA",
                date: "2 hours ago",
              },
              {
                device: "Windows Desktop",
                loc: "Berlin, Germany",
                date: "Last week",
              },
            ].map((sess, i) => (
              <div
                key={i}
                className="hover:bg-muted/50 flex items-center justify-between rounded-lg p-2 text-sm transition-colors"
              >
                <div className="flex items-center gap-3">
                  <History className="h-4 w-4 opacity-50" />
                  <div>
                    <span className="font-medium">{sess.device}</span>
                    <span className="text-muted-foreground ml-2 text-xs">
                      {sess.loc}
                    </span>
                  </div>
                </div>
                <span className="text-muted-foreground text-[10px] font-bold uppercase">
                  {sess.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-6">
          <div className="text-destructive flex items-center gap-3">
            <ShieldAlert className="h-5 w-5" />
            <div className="text-sm">
              <p className="font-bold">Advanced Guardhouse</p>
              <p className="text-xs opacity-70">
                Require biometric re-authentication for sensitive actions
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
}
