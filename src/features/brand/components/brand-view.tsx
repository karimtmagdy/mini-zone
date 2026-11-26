import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { BrandEntity } from "@/features/brand/model/brand.entity"
import { DetailView } from "@/components/common/detail-view"

interface IBrandViewProps {
  brand: BrandEntity
  open: boolean
  onOpenChange: (open: boolean) => void
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString() : "—"
}

/** Read-only dialog showing a single brand. */
export function BrandView({ brand, open, onOpenChange }: IBrandViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{brand.name}</DialogTitle>
          <DialogDescription>{brand.slug}</DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-4 text-sm">
          <DetailView label="Status" value={<Badge>{brand.status}</Badge>} />
          <DetailView label="Products" value={brand.products} />
          <DetailView
            label="Archived"
            value={brand.isArchived ? "Yes" : "No"}
          />
          <DetailView
            label="Archived at"
            value={formatDate(brand.archivedAt)}
          />
          <DetailView label="Created at" value={formatDate(brand.createdAt)} />
          <DetailView label="Updated at" value={formatDate(brand.updatedAt)} />
        </dl>
      </DialogContent>
    </Dialog>
  )
}
