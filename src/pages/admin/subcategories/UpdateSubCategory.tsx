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
import FormSubCategory from "@/features/admin/forms/FormSubCategory";
import { useFormUpdateSubCategory } from "@/hooks/use-subcategory";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";
import type { SubCategoryDto } from "@/contract/subcategory.dto";

interface UpdateSubCategoryProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SubCategoryDto[];
}

export default function UpdateSubCategory({
  id,
  open,
  onOpenChange,
  data,
}: UpdateSubCategoryProps) {
  const subCategory = data?.find((b) => b.id === id);

  const { form, onSubmit, updateMutation } = useFormUpdateSubCategory(id || "", {
    name: subCategory?.name || "",
    description: subCategory?.description || "",
    status: subCategory?.status || "active",
    category: subCategory?.category?.map(c => c.id) || [],
  });

  useEffect(() => {
    if (subCategory) {
      form.reset({
        name: subCategory.name,
        description: subCategory.description,
        status: subCategory.status || "active",
        category: subCategory.category?.map(c => c.id) || [],
      });
    }
  }, [subCategory, form]);



  if (!subCategory) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Sub-category</DialogTitle>
          <DialogDescription>
            Edit the details of <strong>{subCategory.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <FormSubCategory
          form={form}
          onSubmit={onSubmit}
          id="update-subcategory-form"
          showStatus={true}
        />


        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <ButtonSubmitionForm
            mutation={updateMutation}
            form={form}
            name="update-subcategory"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
