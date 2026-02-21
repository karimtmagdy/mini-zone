import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { PropsWithId } from "@/contract/global.dto";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime, formatShortDate } from "@/lib/date";
import type { SubCategoryDto } from "@/contract/subcategory.dto";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";

interface ViewSubCategoryProps extends PropsWithId {
  data: SubCategoryDto[];
}

export default function ViewSubCategory({
  id,
  open,
  onOpenChange,
  data,
}: ViewSubCategoryProps) {
  const subCategory = data?.find((b) => b.id === id);

  if (!subCategory) return null;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Sub-category Details</DialogTitle>
          <DialogDescription>
            View detail of sub-category: {subCategory.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted border-border/50 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-2">
              <Icon.PackageIcon className="text-muted-foreground/40 h-10 w-10" />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {subCategory.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  @{subCategory.slug}
                </p>
              </div>
              <Badge className="w-fit" variant="secondary">
                Sub-category
              </Badge>
            </div>
          </div>

          <div className="bg-muted/30 grid grid-cols-2 gap-x-8 gap-y-6 rounded-lg border p-4">
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Inventory
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.BoxIcon className="text-primary h-4 w-4" />
                <span>{subCategory.products} Products</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Category
              </p>
              <div className="flex items-center gap-2 font-semibold text-xs">
                <Icon.FolderIcon className="text-primary h-4 w-4" />
                <span>{subCategory.category?.[0]?.name || "N/A"}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Registration
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.CalendarIcon className="text-primary h-4 w-4" />
                <span>{formatShortDate(subCategory.createdAt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Activity
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.ClockIcon className="text-primary h-4 w-4" />
                <span>{formatRelativeTime(new Date(subCategory.updatedAt))}</span>
              </div>
            </div>
          </div>
          {subCategory.description && (
            <div className="space-y-2">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Description
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {subCategory.description}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            className="w-full sm:w-auto"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
