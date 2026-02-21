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
import { USER_ROLES, USER_ACCOUNT_STATUS } from "@/contract/user.dto";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormUserProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  id: string;
  isUpdate?: boolean;
}

export default function FormUser<T extends FieldValues>({
  form,
  onSubmit,
  id,
  isUpdate = false,
}: FormUserProps<T>) {
  return (
    <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name={"username" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                {...field}
                id="username"
                placeholder="Username"
                data-invalid={fieldState.invalid}
              />
              {fieldState.error && (
                <p className="text-xs text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {!isUpdate && (
          <>
            <Controller
              name={"email" as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email address"
                    data-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-destructive">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name={"password" as Path<T>}
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    data-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-xs text-destructive">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </>
        )}

        <Controller
          name={"role" as Path<T>}
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger data-invalid={fieldState.invalid}>
                  <SelectValue placeholder="Select role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
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

        {isUpdate && (
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
                      {USER_ACCOUNT_STATUS.map((status) => (
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
    {/* <FormField
          control={form.control}
          name={"image" as Path<T>}
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>Brand Image</FormLabel>
              <FormControl>
                <FileUpload value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}