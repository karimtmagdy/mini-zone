import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ChangePasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="current-password">Current Password</FieldLabel>
          <Input id="current-password" type="password" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="new-password">New Password</FieldLabel>
          <Input id="new-password" type="password" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">
            Confirm New Password
          </FieldLabel>
          <Input id="confirm-password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Update Password</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
