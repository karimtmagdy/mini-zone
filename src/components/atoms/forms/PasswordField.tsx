import { FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useController, type FieldValues } from "react-hook-form";
import { useShow } from "@/hooks/use-click";
import { ToggleShowPasswordIndicator } from "../../common/toggle";
import type { TFieldsProps } from "@/contract/fields.dto";

export default function PasswordField<TValues extends FieldValues>({
  control,
  name,
}: TFieldsProps<TValues>) {
  const { field, fieldState } = useController({ control, name });
  const { show, toggle } = useShow();
  return (
    <>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <InputGroup>
        <InputGroupInput
          {...field}
          type={show ? "text" : "password"}
          id="password"
          aria-invalid={fieldState.invalid}
          autoComplete="off"
          placeholder="••••••"
        />
        <ToggleShowPasswordIndicator show={show} toggle={toggle} />
      </InputGroup>
    </>
  );
}
