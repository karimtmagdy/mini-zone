import { FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Icon } from "@/assets/icon/icons";
import { useController, type FieldValues } from "react-hook-form";
import type { TFieldsProps } from "@/contract/fields.dto";

export default function EmailField<TValues extends FieldValues>({
  control,
  name,
}: TFieldsProps<TValues>) {
  const { field, fieldState } = useController({ control, name });
  return (
    <>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...field}
          type="email"
          id="email"
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          placeholder="Enter your email"
        />
        <InputGroupAddon>
          <Icon.MailIcon />
        </InputGroupAddon>
      </InputGroup>
    </>
  );
}
