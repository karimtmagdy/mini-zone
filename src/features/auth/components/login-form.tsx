import { Eye, EyeOff, LockIcon, MailIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CardForm } from "@/components/common/card-form"
import { FormField } from "@/components/common/form"
import { PATHS } from "@/lib/router/basic.routes"
import { useVisibility } from "@/hooks/use-visibility"
import { useAuthLogin } from "@/features/auth/hooks/use-auth-login"
import { loginZod } from "@/features/auth/model/auth.schema"

export function LoginForm() {
  const { form, mutation, loginSubmit } = useAuthLogin()
  const { visible, toggle } = useVisibility(["password"] as const)

  return (
    <CardForm as="form" noValidate onSubmit={loginSubmit} className="max-w-sm">
      <FormField
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        schema={loginZod}
        iconStart={<MailIcon />}
      />

      <FormField
        form={form}
        name="password"
        label="Password"
        type={visible.password ? "text" : "password"}
        placeholder="••••••"
        schema={loginZod}
        iconStart={<LockIcon />}
        iconEnd={visible.password ? <EyeOff /> : <Eye />}
        iconEndLabel={visible.password ? "Hide password" : "Show password"}
        onIconEndClick={() => toggle("password")}
      />

      <FormField
        form={form}
        name="remember"
        label="Remember me"
        type="checkbox"
      />

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to={PATHS.auth.register}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Sign up
        </Link>
      </p>
      <p className="text-center text-sm text-muted-foreground">
        First-time admin setup?{" "}
        <Link
          to={PATHS.auth.setup_admin}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Setup Admin
        </Link>
      </p>
    </CardForm>
  )
}
