import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Mail, MapPin, Briefcase, Save } from "lucide-react";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-1 text-xl font-bold">Administrative Profile</h2>
        <p className="text-muted-foreground text-sm italic">
          Update your public information and how other admins see you.
        </p>
      </div>

      <div className="flex flex-col items-start gap-8 md:flex-row">
        <div className="group relative">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-indigo-500/30 bg-indigo-500/10">
            <span className="text-2xl font-bold text-indigo-600">KA</span>
          </div>
          <button className="bg-primary text-primary-foreground absolute -right-2 -bottom-2 rounded-lg p-1.5 shadow-lg transition-transform hover:scale-110">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="w-full flex-1 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fname">First Name</Label>
              <Input id="fname" defaultValue="Karim" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lname">Last Name</Label>
              <Input id="lname" defaultValue="Admin" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 opacity-60" /> Email Address
            </Label>
            <Input id="email" defaultValue="admin@mini-zone.com" disabled />
            <p className="text-muted-foreground text-[10px] font-semibold uppercase">
              Contact support to change email
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 border-t pt-6 font-medium md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-1.5 text-sm">
            <Label htmlFor="role" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 opacity-70" /> Professional Role
            </Label>
            <Input id="role" defaultValue="Senior Systems Administrator" />
          </div>
          <div className="space-y-1.5 text-sm">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 opacity-70" /> Operational Base
            </Label>
            <Input id="location" defaultValue="New York, NY" />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button className="gap-2 px-8">
          <Save className="h-4 w-4" /> Save Global Changes
        </Button>
      </div>
    </div>
  );
}
