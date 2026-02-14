import { HaveAccount } from "@/components/atoms/forms";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function ForgotPasswordForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <Button type="submit">Send Reset Link</Button>
        </Field>
        <HaveAccount />
      </FieldGroup>
    </form>
  );
}
