import type { ComponentType } from "react"

import type { ControlProps, FormFieldType } from "../types"
import {
  MultiSelectControl,
  SearchableSelectControl,
  SelectControl,
} from "./choice-controls"
import { FileControl, TextareaControl, TextControl } from "./text-controls"
import { CheckboxControl, DateControl, SwitchControl } from "./toggle-controls"

/** Maps every `FormFieldType` to the control component that renders it. */
export const CONTROLS: Record<FormFieldType, ComponentType<ControlProps>> = {
  text: TextControl,
  number: TextControl,
  password: TextControl,
  email: TextControl,
  textarea: TextareaControl,
  file: FileControl,
  select: SelectControl,
  "searchable-select": SearchableSelectControl,
  "multi-select": MultiSelectControl,
  switch: SwitchControl,
  checkbox: CheckboxControl,
  date: DateControl,
}
