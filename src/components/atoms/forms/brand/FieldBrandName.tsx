import { FieldLabel, FieldLegend } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/assets/icon/icons";
import { useController, type FieldValues } from "react-hook-form";
import type { TFieldsProps } from "@/contract/fields.dto";

export default function FieldBrandName<TValues extends FieldValues>({
  control,
  name,
}: TFieldsProps<TValues>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <>
      <FieldLabel htmlFor="name">brand name</FieldLabel>
      <FieldLegend className="sr-only">{name}</FieldLegend>
      <InputGroup>
        <InputGroupInput
          {...field}
          type="text"
          id="name"
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          placeholder="Enter the brand to continue."
          disabled={control._formState.isSubmitting}
        />
        <InputGroupAddon>
          <Icon.MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
