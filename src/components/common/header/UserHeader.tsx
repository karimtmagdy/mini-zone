import {
  ToggleNotificationIndicator,
  ToggleAdminIndicator,
  ToggleThemeIndicator,
  ToggleUserMenuIndicator,
} from "../toggle";
import RootHeader from "./RootHeader";

export default function UserHeader() {
  return (
    <RootHeader>
      <div className="flex items-center gap-2">logo</div>
      <div className="flex items-center gap-2">
        <ToggleNotificationIndicator />
        <ToggleThemeIndicator />
        <ToggleUserMenuIndicator />
        <ToggleAdminIndicator />
      </div>
    </RootHeader>
  );
}
