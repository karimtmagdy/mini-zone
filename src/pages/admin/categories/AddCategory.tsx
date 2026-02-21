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
import FormCategory from "../../../features/admin/forms/FormCategory";
import { useFormCreateCategory } from "@/hooks/use-category";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";


export default function AddCategory() {
  const { form, onSubmit, createMutation } = useFormCreateCategory();
  return (

    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Icon.PlusIcon />
            Create New Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Add a new category to the system.
            </DialogDescription>
          </DialogHeader>
          <FormCategory form={form} onSubmit={onSubmit} id="create-category-form" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <ButtonSubmitionForm
              mutation={createMutation}
              form={form}
              name="create-category"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
