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

export function useAuthLogin() {
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
    mutationKey: queryKeys.auth.login(),
    mutationFn: async (values: TLoginEX) => {
      const result = await authApi.login({
        email: values.email,
        password: values.password,
      })
      authSession.save(result, values.remember)
      return result
    },
    onSuccess: (result) => {
      queryClient.setQueryData(
        queryKeys.auth.me(),
        buildCurrentAccount(result.user, result.token)
      )
      navigate(PATHS.base, { replace: true })
      toast.add({
        type: "success",
        title: "Logged in successfully",
        description: `Welcome back, ${result.user.username}`,
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
