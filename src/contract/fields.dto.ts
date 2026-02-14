import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface TFieldsProps<TValues extends FieldValues> {
  control: Control<TValues>;
  name: FieldPath<TValues>;
}
