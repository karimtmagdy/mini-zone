import { z } from "zod/v4"
import { useForm, type FieldValues, type UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export function useZod<
  TFieldValues extends FieldValues,
  TTransformedValues extends FieldValues = TFieldValues,
>({
  schema,
  ...options
}: Omit<UseFormProps<TFieldValues, unknown, TTransformedValues>, "resolver"> & {
  schema: z.ZodType<TTransformedValues, TFieldValues>
}) {
  return useForm<TFieldValues, unknown, TTransformedValues>({
    ...options,
    resolver: zodResolver(schema),
  })
}
