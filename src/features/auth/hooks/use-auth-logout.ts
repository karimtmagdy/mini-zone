import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { queryKeys } from "@/core/query-keys"
import { toast } from "@/components/ui/toast"
import { PATHS } from "@/lib/router/basic.routes"
import { authApi } from "@/features/auth/api/auth.api"
import { authSession } from "@/features/auth/api/auth.session"

export function useAuthLogout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  /** Drops the local session and returns to the login screen. */
  const signOutLocally = () => {
    authSession.clear()
    queryClient.removeQueries({ queryKey: queryKeys.auth.all })
    navigate(PATHS.auth.login, { replace: true })
  }

  const mutation = useMutation({
    mutationKey: queryKeys.auth.logout(),
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      signOutLocally()
      toast.add({ type: "success", title: "Logged out successfully" })
    },
    onError: () => {
      // The server session may already be gone — drop the local one anyway.
      signOutLocally()
    },
  })

  return { mutation, logout: () => mutation.mutate() }
}
