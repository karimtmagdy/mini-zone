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
import FormSubCategory from "../../../features/admin/forms/FormSubCategory";
import { useFormCreateSubCategory } from "@/hooks/use-subcategory";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";

export default function AddSubCategory() {
  const { form, onSubmit, createMutation } = useFormCreateSubCategory();
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Icon.PlusIcon />
            Create New Sub-category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sub-category</DialogTitle>
            <DialogDescription>
              Add a new sub-category to the system.
            </DialogDescription>
          </DialogHeader>
          <FormSubCategory form={form} onSubmit={onSubmit} id="create-subcategory-form" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <ButtonSubmitionForm
              mutation={createMutation}
              form={form}
              name="create-subcategory"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
