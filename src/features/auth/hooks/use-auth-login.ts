import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { PATHS } from "@/lib/router/basic.routes"
import { authApi } from "@/features/auth/api/auth.api"
import { authSession } from "@/features/auth/api/auth.session"
import { buildCurrentAccount } from "@/features/auth/model/auth.token"
import {
  loginZod,
  type TLoginDTO,
  type TLoginEX,
} from "@/features/auth/model/auth.schema"

export type AuthLoginMode = "store" | "admin"

function resolveAfterLogin(
  mode: AuthLoginMode,
  role: string | null
): string {
  if (role === "employee" || role === "supplier") return PATHS.panel.base
  if (mode === "admin") return PATHS.auth.setup_admin
  if (role === "customer") return PATHS.auth.setup_admin
  return PATHS.base
}

export function useAuthLogin(mode: AuthLoginMode = "store") {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useZod<TLoginDTO, TLoginEX>({
    schema: loginZod,
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456",
      remember: false,
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: [...queryKeys.auth.login(), mode],
    mutationFn: async (values: TLoginEX) => {
      const result = await authApi.login({
        email: values.email,
        password: values.password,
      })
      authSession.save(result, values.remember)
      return result
    },
    onSuccess: (result) => {
      const account = buildCurrentAccount(result.user, result.token)
      queryClient.setQueryData(queryKeys.auth.me(), account)

      const next = resolveAfterLogin(mode, account.role)
      navigate(next, { replace: true })

      toast.add({
        type: "success",
        title: "Logged in successfully",
        description:
          next === PATHS.auth.setup_admin
            ? "Finish Setup Admin to open the panel."
            : `Welcome back, ${result.user.username}`,
      })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const loginSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, loginSubmit }
}
