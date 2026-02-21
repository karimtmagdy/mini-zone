import { FieldGroup } from "@/components/ui/field";
import { Controller, type UseFormReturn, type FieldValues, type Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useGetCategories } from "@/hooks/use-category";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUBCATEGORY_STATUS } from "@/contract/subcategory.dto";



interface FormSubCategoryProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  id: string;
  showStatus?: boolean;
}

export default function FormSubCategory<T extends FieldValues>({
  form,
  onSubmit,
  id,
  showStatus = false,
}: FormSubCategoryProps<T>) {
  const { data: categoriesData } = useGetCategories({ page: 1, limit: 100 });
  const categories = categoriesData?.data ?? [];

  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name={"category" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={field.value?.[0] || ""}
                onValueChange={(val) => field.onChange([val])}
              >
                <SelectTrigger data-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select parent category..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
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

        <Controller
          name={"name" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                {...field}
                id="name"
                placeholder="Sub-category name"
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
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                {...field}
                value={field.value || ""}
                id="description"
                placeholder="Sub-category description"
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
                      {SUBCATEGORY_STATUS.map((status) => (
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

