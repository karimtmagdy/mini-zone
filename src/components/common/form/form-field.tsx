import {
  Controller,
  useWatch,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

import { CONTROLS } from "./controls"
import type { FormFieldProps } from "./types"
import { useDebounced } from "./use-debounced"
import { getFieldDescription } from "./utils"

/**
 * Schema-driven form field: resolves the right control from `type`, wires it to
 * react-hook-form via `Controller`, and renders label / description / error.
 */
export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  form,
  name,
  label,
  type = "text",
  description,
  placeholder,
  disabled = false,
  options,
  iconStart,
  iconEnd,
  iconStartLabel,
  iconEndLabel,
  onIconStartClick,
  onIconEndClick,
  onSearchChange,
  enablesField,
  accept,
  schema,
  showDescription = true,
  orientation,
}: FormFieldProps<TFieldValues, TName>) {
  const Control = CONTROLS[type]

  // Only subscribes when a gate field is provided, so plain fields don't re-render.
  const gate = useWatch({
    control: form.control,
    name: enablesField ?? name,
    disabled: !enablesField,
  })

  const debouncedSearch = useDebounced(onSearchChange)
  const resolvedDescription = description ?? getFieldDescription(schema, name)
  const isDisabled = disabled || (enablesField ? !gate : false)
  // `switch`/`checkbox` sit next to their label instead of under it.
  const isInline = type === "switch" || type === "checkbox"

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState }) => {
        const control = (
          <Control
            field={field}
            error={fieldState.error}
            type={type}
            disabled={isDisabled}
            placeholder={placeholder}
            options={options}
            iconStart={iconStart}
            iconEnd={iconEnd}
            iconStartLabel={iconStartLabel}
            iconEndLabel={iconEndLabel}
            onIconStartClick={onIconStartClick}
            onIconEndClick={onIconEndClick}
            onSearchChange={onSearchChange ? debouncedSearch : undefined}
            accept={accept}
          />
        )

        return (
          <div className="flex w-full flex-col gap-2">
            <Field
              data-invalid={!!fieldState.error}
              orientation={
                orientation ?? (isInline ? "horizontal" : "vertical")
              }
            >
              {type === "checkbox" ? (
                <>
                  {control}
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                </>
              ) : (
                <>
                  <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                  <FieldContent>{control}</FieldContent>
                </>
              )}
            </Field>

            {showDescription && (
              // Reserved height keeps the layout from shifting when an error
              // appears, and the error takes the description's place.
              <div className="min-h-2">
                {fieldState.error ? (
                  <FieldError errors={[fieldState.error]} />
                ) : resolvedDescription ? (
                  <FieldDescription>{resolvedDescription}</FieldDescription>
                ) : null}
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
