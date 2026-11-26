import { Button } from "@/components/ui/button"
import { FormField } from "@/components/common/form"
import { CardForm } from "@/components/common/card-form"
import { useCreateBrand } from "@/features/brand/hooks/use-create-brand"
import {
  createBrandZod,
  BRAND_STATUS_OPTIONS,
} from "@/features/brand/model/brand.schema"

interface ICreateBrandFormProps {
  onCreated?: () => void
}

export function CreateBrandForm({ onCreated }: ICreateBrandFormProps) {
  const { form, mutation, createSubmit } = useCreateBrand(onCreated)

  return (
    <CardForm
      as="form"
      onSubmit={createSubmit}
      className="grid gap-3 rounded-lg border p-4 md:grid-cols-2"
    >
      <p className="text-sm text-muted-foreground md:col-span-2">
        Creates a new brand that can be linked to products in the catalog.
      </p>

      <FormField
        form={form}
        name="name"
        label="Brand name"
        placeholder="e.g. Nike"
        schema={createBrandZod}
      />
      <FormField
        form={form}
        name="status"
        label="Status"
        type="select"
        options={BRAND_STATUS_OPTIONS}
        schema={createBrandZod}
      />

      <div className="md:col-span-2">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating brand…" : "Add brand"}
        </Button>
      </div>
    </CardForm>
  )
}
