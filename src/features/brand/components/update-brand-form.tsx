import { Button } from "@/components/ui/button"
import { FormField } from "@/components/common/form"
import { CardForm } from "@/components/common/card-form"
import { useUpdateBrand } from "@/features/brand/hooks/use-update-brand"
import type { BrandEntity } from "@/features/brand/model/brand.entity"
import {
  updateBrandZod,
  BRAND_STATUS_OPTIONS,
} from "@/features/brand/model/brand.schema"

interface IUpdateBrandFormProps {
  brand: BrandEntity
  onUpdated?: () => void
}

/** Editable fields for an existing brand, submitted via `PATCH`. */
export function UpdateBrandForm({ brand, onUpdated }: IUpdateBrandFormProps) {
  const { form, mutation, updateSubmit } = useUpdateBrand(brand, onUpdated)

  return (
    <CardForm
      as="form"
      onSubmit={updateSubmit}
      className="grid gap-3 rounded-lg border p-4 md:grid-cols-2"
    >
      <FormField
        form={form}
        name="name"
        label="Brand name"
        placeholder="e.g. Nike"
        schema={updateBrandZod}
      />
      <FormField
        form={form}
        name="status"
        label="Status"
        type="select"
        options={BRAND_STATUS_OPTIONS}
        schema={updateBrandZod}
      />

      <div className="md:col-span-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </CardForm>
  )
}
