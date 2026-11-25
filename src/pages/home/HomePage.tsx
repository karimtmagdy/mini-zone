import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { useCurrentAccount } from "@/features/auth/hooks/use-current-account"
import { PATHS, panelUrl } from "@/lib/router/basic.routes"

export function HomePage() {
  const navigate = useNavigate()
  const { data: account } = useCurrentAccount()
  const isStaff =
    account?.role === "employee" || account?.role === "supplier"
  const needsAdminSetup = Boolean(account) && account?.role === "customer"

  return (
    <div>
      <div className="flex min-h-svh p-6">
        <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
          <div className="space-y-3">
            <h1 className="font-medium">Project ready!</h1>
            <p>You may now add components and start building.</p>

            {isStaff && (
              <Button onClick={() => navigate(PATHS.panel.base)}>
                Open panel
              </Button>
            )}

            {needsAdminSetup && (
              <div className="space-y-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Setup Admin</p>
                  <p className="text-muted-foreground">
                    Your account is still a customer. Finish setup to become the
                    primary admin and unlock the panel.
                  </p>
                </div>
                <Button onClick={() => navigate(PATHS.auth.setup_admin)}>
                  Go to Setup Admin
                </Button>
              </div>
            )}

            {!account && (
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => navigate(PATHS.auth.login)}>
                  Sign in
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(PATHS.auth.register)}
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {isStaff && (
            <p className="text-xs text-muted-foreground">
              Employees:{" "}
              <button
                type="button"
                className="underline"
                onClick={() => navigate(panelUrl(PATHS.panel.employees))}
              >
                {panelUrl(PATHS.panel.employees)}
              </button>
            </p>
          )}

          <div className="font-mono text-xs text-muted-foreground">
            (Press <Kbd>d</Kbd> to toggle dark mode)
          </div>
        </div>
      </div>
    </div>
  )
}
