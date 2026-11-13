import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { ControlProps } from "../types"
import { getOptionLabel } from "../utils"

export function SelectControl({
  field,
  error,
  disabled,
  placeholder,
  options,
}: ControlProps) {
  const { name, value, onChange } = field

  return (
    <Select value={value ?? ""} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger id={name} aria-invalid={!!error} className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/** Single-value combobox with a search box (client or server filtering). */
export function SearchableSelectControl({
  field,
  error,
  disabled,
  placeholder,
  options,
  onSearchChange,
}: ControlProps) {
  const { name, value, onChange } = field

  return (
    <Combobox
      value={value ?? null}
      onValueChange={onChange}
      onInputValueChange={onSearchChange}
      disabled={disabled}
    >
      <ComboboxInput
        id={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        showClear
      />
      <ComboboxContent>
        <ComboboxList>
          {options?.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}

export function MultiSelectControl({
  field,
  error,
  disabled,
  placeholder,
  options,
}: ControlProps) {
  const { name, value, onChange } = field
  const selected = Array.isArray(value) ? (value as string[]) : []

  return (
    <Combobox
      multiple
      value={selected}
      onValueChange={onChange}
      disabled={disabled}
    >
      <ComboboxChips id={name} aria-invalid={!!error}>
        {selected.map((item) => (
          <ComboboxChip key={item}>{getOptionLabel(options, item)}</ComboboxChip>
        ))}
        <ComboboxChipsInput placeholder={placeholder} disabled={disabled} />
        <ComboboxTrigger />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxList>
          {options?.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxContent>
    </Combobox>
  )
}
