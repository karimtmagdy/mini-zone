import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ProfileForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Phone</FieldLabel>
          <Input id="phone" type="tel" required />
        </Field>
        <Field>
          <Button type="submit">Update Profile</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
