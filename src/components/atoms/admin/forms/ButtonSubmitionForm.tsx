import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import { type UseMutationResult } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";

export default function ButtonSubmitionForm({
  name,
  mutation,
  form,
}: {
  name: string;
  mutation: UseMutationResult<any, any, any, any>;
  form: UseFormReturn<any>;
}) {
  return (
    <Button
      type="submit"
      form={`${name}-form`}
      disabled={mutation.isPending || !form.formState.isValid}
    >
      {mutation.isPending ? (
        <>
          <Icon.Loader2Icon className="animate-spin" />
          Save Changes
        </>
      ) : (
        <>
          <Icon.SaveIcon />
          Save
        </>
      )}
    </Button>
  );
}
