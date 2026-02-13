import { Outlet, NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/assets/icon/icons";

import {
  PATH_SETTINGS_PROFILE,
  PATH_SETTINGS_SECURITY,
  PATH_SETTINGS_APPEARANCE,
} from "@/lib/links/paths.routes";

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

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-foreground text-3xl font-bold tracking-tight">
          Global Settings
        </h1>
        <p className="text-muted-foreground italic">
          Configure your administrative experience and security preferences.
        </p>
      </div>

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="shrink-0 lg:w-64">
          <nav className="flex flex-col gap-1">
            {settingsNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : item.disabled
                        ? "text-muted-foreground/50 cursor-not-allowed"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )
                }
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4",
                    location.pathname === item.href
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground",
                  )}
                />
                {item.name}
                {item.disabled && (
                  <span className="ml-auto text-[10px] font-bold tracking-widest uppercase opacity-60">
                    Soon
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">
          <div className="bg-card animate-in fade-in slide-in-from-bottom-2 rounded-2xl border p-6 shadow-xs duration-500 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
