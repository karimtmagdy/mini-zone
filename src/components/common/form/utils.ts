import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form"

import type { FormFieldOption, FormSchema } from "./types"

/**
 * Reads a field's Zod `.describe()` helper text.
 * Call `.describe()` on the outermost schema (after `.optional()`/`.default()`)
 * so it lands on the entry returned by `schema.shape[name]`.
 */
export function getFieldDescription(
  schema: FormSchema | undefined,
  name: string,
  fallback?: string
): string | undefined {
  const entry = schema?.shape?.[name] as { description?: string } | undefined
  return entry?.description?.trim() || fallback
}

/**
 * Surfaces backend validation errors on the matching fields after a failed
 * submit. Matches the project `ApiError` shape (`Record<string, string[]>`).
 */
export function applyServerErrors<TFieldValues extends FieldValues>(
  form: { setError: UseFormSetError<TFieldValues> },
  errors?: Record<string, string[]>
): void {
  if (!errors) return

  for (const [field, messages] of Object.entries(errors)) {
    if (!messages?.length) continue

    form.setError(field as FieldPath<TFieldValues>, {
      type: "server",
      message: messages.join(", "),
    })
  }
}

/** Keeps number inputs controlled while allowing an empty value and partial input. */
export function parseNumberInput(raw: string): string | number {
  if (raw.trim() === "") return ""

  const parsed = Number(raw)
  return Number.isNaN(parsed) ? raw : parsed
}

/** Resolves the display label for an option value, falling back to the raw value. */
export function getOptionLabel(
  options: readonly FormFieldOption[] | undefined,
  value: string
): string {
  return options?.find((option) => option.value === value)?.label ?? value
}
