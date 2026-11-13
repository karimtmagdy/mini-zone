import type { ReactNode } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"

import type { ControlProps } from "../types"
import { parseNumberInput } from "../utils"

interface IconSlotProps {
  icon?: ReactNode
  label?: string
  align: "inline-start" | "inline-end"
  onClick?: () => void
}

function IconSlot({ icon, label, align, onClick }: IconSlotProps) {
  if (!icon) return null

  return (
    <InputGroupAddon align={align}>
      {onClick ? (
        <InputGroupButton
          type="button"
          size="icon-xs"
          aria-label={label}
          onClick={onClick}
        >
          {icon}
        </InputGroupButton>
      ) : (
        icon
      )}
    </InputGroupAddon>
  )
}

/** Handles `text`, `number`, `password` and `email` inputs. */
export function TextControl({
  field,
  error,
  type,
  disabled,
  placeholder,
  iconStart,
  iconEnd,
  iconStartLabel,
  iconEndLabel,
  onIconStartClick,
  onIconEndClick,
}: ControlProps) {
  const { name, value, onChange, onBlur, ref } = field

  return (
    <InputGroup>
      <IconSlot
        icon={iconStart}
        label={iconStartLabel}
        align="inline-start"
        onClick={onIconStartClick}
      />
      <InputGroupInput
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        aria-invalid={!!error}
        ref={ref}
        onBlur={onBlur}
        value={value == null ? "" : String(value)}
        onChange={(event) =>
          onChange(
            type === "number"
              ? parseNumberInput(event.target.value)
              : event.target.value
          )
        }
      />
      <IconSlot
        icon={iconEnd}
        label={iconEndLabel}
        align="inline-end"
        onClick={onIconEndClick}
      />
    </InputGroup>
  )
}

export function TextareaControl({
  field,
  error,
  disabled,
  placeholder,
}: ControlProps) {
  const { name, value, onChange, onBlur, ref } = field

  return (
    <InputGroup>
      <InputGroupTextarea
        id={name}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        ref={ref}
        onBlur={onBlur}
        value={value == null ? "" : String(value)}
        onChange={(event) => onChange(event.target.value)}
      />
    </InputGroup>
  )
}

export function FileControl({ field, error, disabled, accept }: ControlProps) {
  const { name, onChange, onBlur, ref } = field

  return (
    <InputGroup>
      <InputGroupInput
        id={name}
        name={name}
        type="file"
        accept={accept}
        disabled={disabled}
        aria-invalid={!!error}
        ref={ref}
        onBlur={onBlur}
        className="file:cursor-pointer"
        onChange={(event) => onChange(event.target.files?.[0])}
      />
    </InputGroup>
  )
}
