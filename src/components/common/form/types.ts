import type { ReactNode } from "react"
import type {
  FieldError,
  FieldPath,
  FieldValues,
  RefCallBack,
  UseFormReturn,
} from "react-hook-form"

/** Every input flavor the `FormField` can render. */
export type FormFieldType =
  | "text"
  | "number"
  | "password"
  | "email"
  | "textarea"
  | "select"
  | "multi-select"
  | "searchable-select"
  | "file"
  | "switch"
  | "checkbox"
  | "date"

export interface FormFieldOption {
  label: string
  value: string
}

/** Structural view of a Zod object schema, used to read `.describe()` hints. */
export interface FormSchema {
  shape: Record<string, unknown>
}

/** The subset of react-hook-form's Controller `field` that controls rely on. */
export interface ControlField {
  name: string
  value: unknown
  onChange: (...event: unknown[]) => void
  onBlur: () => void
  ref: RefCallBack
}

/** Props shared by every control implementation in the `CONTROLS` map. */
export interface ControlProps {
  field: ControlField
  error?: FieldError
  type: FormFieldType
  disabled: boolean
  placeholder?: string
  options?: readonly FormFieldOption[]
  iconStart?: ReactNode
  iconEnd?: ReactNode
  /** Accessible name for the start icon button, used when `onIconStartClick` is set. */
  iconStartLabel?: string
  /** Accessible name for the end icon button, used when `onIconEndClick` is set. */
  iconEndLabel?: string
  onIconStartClick?: () => void
  onIconEndClick?: () => void
  onSearchChange?: (value: string) => void
  accept?: string
}

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>
  name: TName
  label: string
  type?: FormFieldType
  /** Explicit helper text; falls back to the Zod `.describe()` value. */
  description?: string
  placeholder?: string
  disabled?: boolean
  options?: readonly FormFieldOption[]
  iconStart?: ReactNode
  iconEnd?: ReactNode
  /** Accessible name for the start icon button, used when `onIconStartClick` is set. */
  iconStartLabel?: string
  /** Accessible name for the end icon button, used when `onIconEndClick` is set. */
  iconEndLabel?: string
  onIconStartClick?: () => void
  onIconEndClick?: () => void
  /** Debounced callback fired while typing in a `searchable-select`. */
  onSearchChange?: (value: string) => void
  /** Boolean field path that gates (enables/disables) this field. */
  enablesField?: FieldPath<TFieldValues>
  /** `accept` attribute forwarded to `file` inputs. */
  accept?: string
  /** Zod object used to pull `.describe()` helper text from. */
  schema?: FormSchema
  /** Hides the description/error slot when `false`. */
  showDescription?: boolean
  /** Layout of the label relative to the control. Defaults to `vertical`. */
  orientation?: "vertical" | "horizontal" | "responsive"
}
