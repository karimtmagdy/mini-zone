import { Button } from "@/components/ui/button";
import { Icon } from "@/assets/icon/icons";

export default function ToggleNotificationIndicator() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      name="notification-button"
      aria-label="notification-button"
    >
      <Icon.BellIcon />
      <HighLightIndicator />
    </Button>
  );
}

// function NotificationIndicator() {
//   return (
//     <div className="bg-primary text-primary-foreground flex h-2 w-2 items-center justify-center rounded-full">
//       2
//     </div>
//   );
// }
function HighLightIndicator() {
  return (
    <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
  );
}
