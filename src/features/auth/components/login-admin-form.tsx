import { Eye, EyeOff, LockIcon, MailIcon, ShieldCheck } from "lucide-react"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CardForm } from "@/components/common/card-form"
import { FormField } from "@/components/common/form"
import { PATHS } from "@/lib/router/basic.routes"
import { useVisibility } from "@/hooks/use-visibility"
import { useAuthLogin } from "@/features/auth/hooks/use-auth-login"
import { loginZod } from "@/features/auth/model/auth.schema"

export function LoginAdminForm() {
  const { form, mutation, loginSubmit } = useAuthLogin("admin")
  const { visible, toggle } = useVisibility(["password"] as const)

  return (
    <CardForm as="form" noValidate onSubmit={loginSubmit} className="max-w-sm">
      <div className="mb-2 space-y-1 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
          <ShieldCheck className="size-5" />
        </div>
        <h1 className="text-lg font-medium">Login Admin</h1>
        <p className="text-sm text-muted-foreground">
          Staff sign-in for the control panel.
        </p>
      </div>

      <FormField
        form={form}
        name="email"
        label="Email"
        type="email"
        placeholder="admin@example.com"
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
        {mutation.isPending ? "Signing in..." : "Sign in to panel"}
      </Button>

      <div className="space-y-1 text-center text-sm text-muted-foreground">
        <p>
          First account?{" "}
          <Link
            to={PATHS.auth.register}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Register
          </Link>
          {" · "}
          <Link
            to={PATHS.auth.setup_admin}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Setup Admin
          </Link>
        </p>
        <p>
          Customer store?{" "}
          <Link
            to={PATHS.auth.login}
            className="underline underline-offset-4 hover:text-foreground"
          >
            Regular login
          </Link>
        </p>
      </div>
    </CardForm>
  )
}
