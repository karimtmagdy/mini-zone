import { useState } from "react"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

import type { ControlProps } from "../types"

export function SwitchControl({ field, error, disabled }: ControlProps) {
  const { name, value, onChange } = field

  return (
    <Switch
      id={name}
      checked={value === true}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-invalid={!!error}
    />
  )
}

export function CheckboxControl({ field, error, disabled }: ControlProps) {
  const { name, value, onChange } = field

  return (
    <Checkbox
      id={name}
      checked={value === true}
      onCheckedChange={onChange}
      disabled={disabled}
      aria-invalid={!!error}
    />
  )
}

export function DateControl({
  field,
  error,
  disabled,
  placeholder,
}: ControlProps) {
  const { name, value, onChange, onBlur } = field
  const [open, setOpen] = useState(false)
  const selected = value instanceof Date ? value : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        id={name}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start gap-2 font-normal",
          !selected && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="size-4 opacity-60" />
        {selected ? format(selected, "PPP") : (placeholder ?? "Pick a date")}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          autoFocus
          onSelect={(date) => {
            onChange(date)
            onBlur()
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
