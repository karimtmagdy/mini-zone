import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { useZod } from "@/hooks/use-zod"
import { queryKeys } from "@/core/query-keys"
import { getErrorMessage } from "@/core/http-error"
import { toast } from "@/components/ui/toast"
import { PATHS } from "@/lib/router/basic.routes"
import { authApi } from "@/features/auth/api/auth.api"
import {
  registerZod,
  type TRegisterDTO,
  type TRegisterEX,
} from "@/features/auth/model/auth.schema"

export function useAuthRegister() {
  const navigate = useNavigate()

  const form = useZod<TRegisterDTO, TRegisterEX>({
    schema: registerZod,
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    mode: "onSubmit",
  })

  const mutation = useMutation({
    mutationKey: queryKeys.auth.register(),
    mutationFn: (values: TRegisterEX) =>
      authApi.register({
        username: values.username,
        email: values.email,
        password: values.password,
        confirm: values.confirm,
      }),
    onSuccess: () => {
      toast.add({
        type: "success",
        title: "Account created",
        description: "Please sign in to continue.",
      })
      navigate(PATHS.auth.login, { replace: true })
    },
    onError: (error) => {
      toast.add({ type: "error", title: getErrorMessage(error) })
    },
  })

  const registerSubmit = form.handleSubmit(
    (values) => mutation.mutateAsync(values),
    () =>
      toast.add({
        type: "error",
        title: "Please check the form fields.",
      })
  )

  return { form, mutation, registerSubmit }
}
