import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export function TriggerNotifications() {
  return (
    <Button variant="outline" size="icon-xs">
      <Bell />
    </Button>
  )
}