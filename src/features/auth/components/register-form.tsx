import { Eye, EyeOff, LockIcon, MailIcon, UserRoundIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CardForm } from "@/components/common/card-form"
import { FormField } from "@/components/common/form"
import { PATHS } from "@/lib/router/basic.routes"
import { useVisibility } from "@/hooks/use-visibility"
import { useAuthRegister } from "@/features/auth/hooks/use-auth-register"
import { registerZod } from "@/features/auth/model/auth.schema"

export function RegisterForm() {
  const { form, mutation, registerSubmit } = useAuthRegister()
  const { visible, toggle } = useVisibility(["password", "confirm"] as const)

  return (
    <CardForm as="form" noValidate onSubmit={registerSubmit} className="max-w-sm">
      <FormField
        form={form}
        name="username"
        label="Username"
        placeholder="your name"
        schema={registerZod}
        iconStart={<UserRoundIcon />}
      />

      <FormField
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        schema={registerZod}
        iconStart={<MailIcon />}
      />

      <FormField
        form={form}
        name="password"
        label="Password"
        type={visible.password ? "text" : "password"}
        placeholder="••••••"
        schema={registerZod}
        iconStart={<LockIcon />}
        iconEnd={visible.password ? <EyeOff /> : <Eye />}
        iconEndLabel={visible.password ? "Hide password" : "Show password"}
        onIconEndClick={() => toggle("password")}
      />

      <FormField
        form={form}
        name="confirm"
        label="Confirm password"
        type={visible.confirm ? "text" : "password"}
        placeholder="••••••"
        schema={registerZod}
        iconStart={<LockIcon />}
        iconEnd={visible.confirm ? <EyeOff /> : <Eye />}
        iconEndLabel={visible.confirm ? "Hide password" : "Show password"}
        onIconEndClick={() => toggle("confirm")}
      />

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to={PATHS.auth.login}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Sign in
        </Link>
      </p>
    </CardForm>
  )
}
