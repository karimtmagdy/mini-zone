import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Link } from "react-router-dom";
import { useAuthFormLogin } from "@/hooks/use-auth";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Controller } from "react-hook-form";
import { useShow } from "@/hooks/use-click";
import ToggleShowPasswordIndicator from "@/components/common/toggle/ToggleShowPasswordIndicator";
import { Icon } from "@/assets/icon/icons";

export function LoginForm({ ...props }: React.ComponentProps<"form">) {
  const { form, onSubmit, loginMutation } = useAuthFormLogin();
  const { show, toggle } = useShow();
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <FieldGroup className="gap-2">
        {form.formState.errors.root && (
          <FieldError className="bg-destructive/10 mb-2 rounded-lg p-2 text-center font-bold italic">
            {form.formState.errors.root.message}
          </FieldError>
        )}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type="email"
                  id="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="Enter your email"
                />
                <InputGroupAddon>
                  <Icon.MailIcon />
                </InputGroupAddon>
              </InputGroup>
              <div className="min-h-6">
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className="**:flex **:items-center **:gap-1">
                    {field.value ? (
                      <span className="text-green-500">
                        <Icon.CircleCheckIcon className="size-3" /> Looks good.
                      </span>
                    ) : (
                      <span>
                        <Icon.InfoIcon className="size-3" /> Enter your email to
                        continue.
                      </span>
                    )}
                  </FieldDescription>
                )}
              </div>
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  to="/auth/forgot-password"
                  className="hover:text-primary text-foreground text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  type={show ? "text" : "password"}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder="••••••"
                />
                <ToggleShowPasswordIndicator show={show} toggle={toggle} />
              </InputGroup>
              <div className="min-h-6">
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : (
                  <FieldDescription className="**:flex **:items-center **:gap-1">
                    {field.value ? (
                      <span className="text-green-500">
                        <Icon.CircleCheckIcon className="size-3" /> You're all set.
                      </span>
                    ) : (
                      <span>
                        <Icon.InfoIcon className="size-3" /> Secure your access.
                      </span>
                    )}
                  </FieldDescription>
                )}
              </div>
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Field>
          <Button type="submit">
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/auth/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
