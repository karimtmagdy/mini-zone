import { FieldDescription, FieldError } from "@/components/ui/field";
import { Icon } from "@/assets/icon/icons";
import { useController } from "react-hook-form";
import type { TFieldsProps } from "@/contract/fields.dto";
import type { FieldValues } from "react-hook-form";

export default function FieldStatus<TValues extends FieldValues>({
  textInfo,
  textGreat,
  ...props
}: TFieldsProps<TValues> & {
  textInfo: string;
  textGreat: string;
}) {
  const { field, fieldState } = useController(props);
  return (
    <div className="min-h-6">
      {fieldState.invalid ? (
        <FieldError errors={[fieldState.error]} />
      ) : (
        <FieldDescription className="**:flex **:items-center **:gap-1">
          {field.value ? (
            <span className="text-green-500">
              <Icon.CircleCheckIcon className="size-3" /> {textGreat}
            </span>
          ) : (
            <span>
              <Icon.InfoIcon className="size-3" /> {textInfo}
            </span>
          )}
        </FieldDescription>
      )}
    </div>
  );
}
// textGreat
