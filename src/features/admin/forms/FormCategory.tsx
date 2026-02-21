import { FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import { CATEGORY_STATUS } from "@/contract/category.dto";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormCategoryProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  id: string;
  showStatus?: boolean;
}

export default function FormCategory<T extends FieldValues>({
  form,
  onSubmit,
  id,
  showStatus = false,
}: FormCategoryProps<T>) {
  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name={"name" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...field}
                id="name"
                placeholder="Category name"
                data-invalid={fieldState.invalid}
              />
              {fieldState.error && (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name={"description" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...field}
                id="description"
                placeholder="Category description"
                data-invalid={fieldState.invalid}
              />
              {fieldState.error && (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {showStatus && (
          <Controller
            name={"status" as Path<T>}
            control={form.control}
            render={({ field, fieldState }) => (
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger data-invalid={fieldState.invalid}>
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {CATEGORY_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {fieldState.error && (
                  <p className="text-xs text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        )}
      </FieldGroup>
    </form>
  );
}

