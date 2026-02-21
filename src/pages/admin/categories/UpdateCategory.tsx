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
import FormCategory from "@/features/admin/forms/FormCategory";
import { useFormUpdateCategory } from "@/hooks/use-category";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";
import type { CategoryDto } from "@/contract/category.dto";

interface UpdateCategoryProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CategoryDto[];
}

export default function UpdateCategory({
  id,
  open,
  onOpenChange,
  data,
}: UpdateCategoryProps) {
  const category = data?.find((b) => b.id === id);

  const { form, onSubmit, updateMutation } = useFormUpdateCategory(id || "", {
    name: category?.name || "",
    description: category?.description || "",
    status: category?.status || "active",
  });

  // ✅ Reset the form when the category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description,
        status: category.status,
      });
    }
  }, [category, form]);


  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Edit the details of <strong>{category.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <FormCategory
          form={form}
          onSubmit={onSubmit}
          id="update-category-form"
          showStatus={true}
        />


        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <ButtonSubmitionForm
            mutation={updateMutation}
            form={form}
            name="update-category"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
