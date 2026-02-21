import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import FieldBrandName from "@/components/atoms/forms/brand/FieldBrandName";
import { FieldStatus } from "@/components/atoms/forms";
import { BRAND_STATUS } from "@/contract/brand.dto";

import FieldBrandImage from "@/components/atoms/forms/brand/FieldBrandImage";

interface FormBrandProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  id: string;
  currentImage?: string;
}

export default function FormBrand<T extends FieldValues>({
  form,
  onSubmit,
  id,
  currentImage,
}: FormBrandProps<T>) {
  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldBrandImage
          control={form.control}
          name={"image" as Path<T>}
          currentImage={currentImage}
        />
        <Controller
          name={"name" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldBrandName control={form.control} name={field.name} />
              <FieldStatus
                control={form.control}
                name={field.name}
                textInfo="This is the public display name of the brand."
                textGreat="Looks good."
              />
            </Field>
          )}
        />
        <Controller
          name={"status" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {BRAND_STATUS.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
