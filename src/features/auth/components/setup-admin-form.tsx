import { ShieldPlus } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CardForm } from "@/components/common/card-form"
import { authSession } from "@/features/auth/api/auth.session"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { useBootstrapAdmin } from "@/features/employee/hooks/use-bootstrap-admin"
import { PATHS } from "@/lib/router/basic.routes"

/** Shown when the visitor opens Setup Admin without a session. */
export function SetupAdminGate() {
  const navigate = useNavigate()

  return (
    <CardForm className="max-w-sm gap-4 rounded-2xl border p-6">
      <div className="space-y-1 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
          <ShieldPlus className="size-5" />
        </div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Setup Admin
        </p>
        <h1 className="text-lg font-medium">Sign in first</h1>
        <p className="text-sm text-muted-foreground">
          Create an account or sign in, then return here to become the primary
          admin.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={() => navigate(PATHS.auth.login_admin)}>
          Login Admin
        </Button>
        <Button variant="outline" onClick={() => navigate(PATHS.auth.login)}>
          Regular login
        </Button>
        <Button variant="ghost" onClick={() => navigate(PATHS.auth.register)}>
          Register
        </Button>
      </div>
    </CardForm>
  )
}

export function SetupAdminForm() {
  const navigate = useNavigate()
  const { data: account } = useCurrentAccount()
  const bootstrap = useBootstrapAdmin()

  return (
    <CardForm className="max-w-sm gap-4 rounded-2xl border p-6">
      <div className="space-y-1 text-center">
        <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-muted">
          <ShieldPlus className="size-5" />
        </div>
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Setup Admin
        </p>
        <h1 className="text-lg font-medium">Become primary admin</h1>
        <p className="text-sm text-muted-foreground">
          Grants admin job role and full permissions to this account, then opens
          the employees page so you can hire staff.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-3 text-sm text-muted-foreground">
        <p>
          Signed in as{" "}
          <span className="font-medium text-foreground">
            {account?.user.email ?? authSession.getUser()?.email ?? "—"}
          </span>
        </p>
        <p className="mt-1">
          Current role:{" "}
          <span className="font-medium text-foreground">
            {account?.role ?? "unknown"}
          </span>
        </p>
        <p className="mt-1">
          Will set: department management · job director · jobRole admin
        </p>
      </div>

      <Button
        className="w-full"
        disabled={bootstrap.isPending || !account}
        onClick={() =>
          bootstrap.mutate({
            department: "management",
            job: "director",
          })
        }
      >
        {bootstrap.isPending ? "Creating admin…" : "Become primary admin"}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate(PATHS.panel.base)}
      >
        Back to panel
      </Button>
    </CardForm>
  )
}
