import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 import { Icon } from "@/assets/icon/icons";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function SecuritySettingsPage() {
  return (
    <div className="space-y-10">
      <SecurityHeader />

      <div className="space-y-6">
        <TwoFactorSection />
        <AccessControlSection />
        <DeviceAuthorizationSection />
        <AdvancedGuardhouseSection />
      </div>
    </div>
  );
}

function SecurityHeader() {
  return (
    <div>
      <h2 className="mb-1 text-xl font-bold italic">
        Security & Infrastructure
      </h2>
      <p className="text-muted-foreground text-sm">
        Maintain the integrity of your administrative access.
      </p>
    </div>
  );
}

function TwoFactorSection() {
  return (
    <>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Icon.SmartphoneIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Two-Factor Authentication</ItemTitle>
          <ItemDescription>
            Currently active via Google Authenticator
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
    </>
  );
}

function AccessControlSection() {
  return (
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
          <Icon.KeyRoundIcon /> Rotate Password
        </Button>
      </div>
    </div>
  );
}

function DeviceAuthorizationSection() {
  const sessions = [
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
  ];

  return (
    <div className="border-t pt-6">
      <h3 className="text-muted-foreground mb-4 text-sm font-bold tracking-wider uppercase">
        Device Authorization
      </h3>
      <div className="space-y-3">
        {sessions.map((sess, i) => (
          <div
            key={i}
            className="hover:bg-muted/50 flex items-center justify-between rounded-lg p-2 text-sm transition-colors"
          >
            <div className="flex items-center gap-3">
              <Icon.HistoryIcon className="opacity-50" />
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
  );
}

function AdvancedGuardhouseSection() {
  return (
    <Item variant="outline" className="text-destructive bg-inherit">
      <ItemMedia variant="icon">
        <Icon.ShieldAlertIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Advanced Guardhouse</ItemTitle>
        <ItemDescription className="text-current/80">
          Require biometric re-authentication for sensitive actions
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Enable
        </Button>
      </ItemActions>
    </Item>
  );
}
