import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormUser from "@/features/admin/forms/FormUser";
import { useFormUpdateUser } from "@/hooks/use-users";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";
import type { UserDto } from "@/contract/user.dto";

interface UpdateUserProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: UserDto[];
}

export default function UpdateUser({
  id,
  open,
  onOpenChange,
  data,
}: UpdateUserProps) {
  const user = data?.find((b) => b.id === id);

  const { form, onSubmit, updateMutation } = useFormUpdateUser(id || "", {
    username: user?.username || "",
    role: user?.role || "user",
    status: user?.status || "active",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        role: user.role,
        status: user.status,
      });
    }
  }, [user, form]);

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Edit the details of <strong>{user.username}</strong>.
          </DialogDescription>
        </DialogHeader>

        <FormUser
          form={form}
          onSubmit={onSubmit}
          id="update-user-form"
          isUpdate={true}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <ButtonSubmitionForm
            mutation={updateMutation}
            form={form}
            name="update-user-form"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
