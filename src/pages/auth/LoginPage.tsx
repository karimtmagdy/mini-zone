import { Link } from "react-router-dom"

import { LoginForm } from "@/features/auth/components/login-form"
import { PATHS } from "@/lib/router/basic.routes"

export function LoginPage() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <LoginForm />
      <p className="text-center text-sm text-muted-foreground">
        Staff panel?{" "}
        <Link
          to={PATHS.auth.login_admin}
          className="underline underline-offset-4 hover:text-foreground"
        >
          Login Admin
        </Link>
      </p>
    </div>
  )
}
