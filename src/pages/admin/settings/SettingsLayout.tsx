import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@/assets/icon/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  PATH_SETTINGS_PROFILE,
  PATH_SETTINGS_SECURITY,
  PATH_SETTINGS_APPEARANCE,
} from "@/lib/links/paths.routes";
import { Badge } from "@/components/ui/badge";

const settingsNavItems = [
  { name: "My Profile", href: PATH_SETTINGS_PROFILE, icon: Icon.UserIcon },
  {
    name: "Security & Login",
    href: PATH_SETTINGS_SECURITY,
    icon: Icon.ShieldCheckIcon,
  },
  {
    name: "Theme & Interface",
    href: PATH_SETTINGS_APPEARANCE,
    icon: Icon.PaletteIcon,
  },
  { name: "Notifications", href: "#", icon: Icon.BellRingIcon, disabled: true },
  { name: "Localization", href: "#", icon: Icon.GlobeIcon, disabled: true },
  {
    name: "Data Persistence",
    href: "#",
    icon: Icon.DatabaseIcon,
    disabled: true,
  },
];

function PageHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h2 className="text-foreground text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-muted-foreground italic">{desc}</p>
    </div>
  );
}

export default function SettingsLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current route
  const activeTab =
    settingsNavItems.find((item) => location.pathname.includes(item.href))
      ?.href || PATH_SETTINGS_PROFILE;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Global Settings"
        desc="Configure your administrative experience and security preferences."
      />

      {/* Tab-based Navigation */}
      <Tabs value={activeTab}>
        <TabsList className=" ">
          {settingsNavItems
            .filter((item) => !item.disabled)
            .map((item) => (
              <TabsTrigger
                key={item.name}
                value={item.href}
                onClick={() => navigate(item.href)}
                className="relative"
              >
                <item.icon className="hidden @md:flex" />
                {item.name}
              </TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value={activeTab}>
          <Outlet />
        </TabsContent>
      </Tabs>

      {/* Disabled Settings Info */}
      {settingsNavItems.filter((item) => item.disabled).length > 0 && (
        <div className="border-t pt-6">
          <p className="text-muted-foreground mb-3 text-sm font-medium">
            Coming Soon
          </p>
          <div className="flex flex-wrap gap-1">
            {settingsNavItems
              .filter((item) => item.disabled)
              .map((item) => (
                <Badge key={item.name} variant="outline">
                  <item.icon />
                  {item.name}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
