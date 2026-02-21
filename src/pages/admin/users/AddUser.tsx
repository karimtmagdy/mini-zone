import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormUser from "../../../features/admin/forms/FormUser";
import { useFormCreateUser } from "@/hooks/use-users";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";

export default function AddUser() {
  const { form, onSubmit, createMutation } = useFormCreateUser();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Icon.UserPlusIcon />
            Create New User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system.
            </DialogDescription>
          </DialogHeader>
          <FormUser form={form} onSubmit={onSubmit} id="create-user-form" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <ButtonSubmitionForm
              mutation={createMutation}
              form={form}
              name="create-user-form"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
