import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { PATHS, panelUrl } from "@/lib/router/basic.routes"
import { authApi } from "@/features/auth/api/auth.api"
import { authSession } from "@/features/auth/api/auth.session"
import { buildCurrentAccount } from "@/features/auth/model/auth.token"
import { employeeApi } from "@/features/employee/api/employee.api"
import type { IBootstrapAdminPayload } from "@/features/employee/model/employee.entity"

/**
 * Promotes the signed-in account to the first admin employee, then refreshes
 * the access token so panel permissions apply immediately.
 */
export function useBootstrapAdmin() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: queryKeys.employees.bootstrap(),
    mutationFn: async (payload: IBootstrapAdminPayload) => {
      const employee = await employeeApi.bootstrap(payload)
      const session = await authApi.refresh()
      authSession.replace(session)
      return { employee, session }
    },
    onSuccess: ({ session }) => {
      queryClient.setQueryData(
        queryKeys.auth.me(),
        buildCurrentAccount(session.user, session.token)
      )
      void queryClient.invalidateQueries({ queryKey: queryKeys.employees.all })
      toast.add({
        type: "success",
        title: "Admin ready",
        description: "Your account is now the primary admin.",
      })
      navigate(panelUrl(PATHS.panel.employees), { replace: true })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })
}
