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
import FormBrand from "@/features/admin/forms/FormBrand";
import { useFormUpdateBrand } from "@/hooks/use-brand";
import ButtonSubmitionForm from "@/components/atoms/admin/forms/ButtonSubmitionForm";
import type { BrandDto } from "@/contract/brand.dto";

interface UpdateBrandProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: BrandDto[];
}

export default function UpdateBrand({
  id,
  open,
  onOpenChange,
  data,
}: UpdateBrandProps) {
  const brand = data?.find((b) => b.id === id);

  const { form, onSubmit, updateMutation } = useFormUpdateBrand(id || "", {
    name: brand?.name || "",
    status: brand?.status || "active",
    // ✅ Don't pre-fill image in RHF — it's handled via currentImage prop for preview only
  });

  // ✅ Reset form fields (excluding image) when the selected brand changes
  useEffect(() => {
    if (brand) {
      form.reset({
        name: brand.name,
        status: brand.status,
        // image is intentionally not reset here:
        // - currentImage prop handles the preview
        // - If user picks a new file, field.onChange(File) sets it
        // - If user doesn't pick a new file, image stays undefined → backend keeps existing
        image: undefined,
      });
    }
  }, [brand, form]);

  if (!brand) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Brand</DialogTitle>
          <DialogDescription>
            Edit the details of <strong>{brand.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <FormBrand
          form={form}
          onSubmit={onSubmit}
          id="update-brand-form"
          // ✅ Pass the existing image URL so FieldBrandImage can show the preview
          currentImage={brand?.image?.url}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <ButtonSubmitionForm
            mutation={updateMutation}
            form={form}
            name="update-brand"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
