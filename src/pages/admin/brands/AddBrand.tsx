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
import FormBrand from "../../../features/admin/forms/FormBrand";
import { useFormCreateBrand } from "@/hooks/use-brand";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";

export default function AddBrand() {
  const { form, onSubmit, createMutation } = useFormCreateBrand();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Icon.PlusIcon />
            Create New Brand
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Brand</DialogTitle>
            <DialogDescription>
              Add a new brand to the system.
            </DialogDescription>
          </DialogHeader>
          <FormBrand form={form} onSubmit={onSubmit} id="create-brand-form" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <ButtonSubmitionForm
              mutation={createMutation}
              form={form}
              name="create-brand"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
