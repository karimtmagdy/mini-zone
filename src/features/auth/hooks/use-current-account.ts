import { useQuery } from "@tanstack/react-query"

import { queryKeys } from "@/core/query-keys"
import { authApi } from "@/features/auth/api/auth.api"
import { authSession } from "@/features/auth/api/auth.session"
import { buildCurrentAccount } from "@/features/auth/model/auth.token"

/**
 * The signed-in account (user + role + permissions from the access token).
 * Seeds from the stored session so the UI renders instantly, and only hits
 * `/auth/me` when an access token is present.
 */
export function useCurrentAccount() {
  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () =>
      buildCurrentAccount(await authApi.me(), authSession.getToken()),
    enabled: Boolean(authSession.getToken()),
    initialData: () => {
      const user = authSession.getUser()
      const token = authSession.getToken()

      return user && token ? buildCurrentAccount(user, token) : undefined
    },
  })
}
