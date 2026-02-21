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
import type { BrandDto } from "@/contract/brand.dto";
import { Icon } from "@/assets/icon/icons";
import { Button } from "@/components/ui/button";
interface ViewBrandProps extends PropsWithId {
  data: BrandDto[];
}
export default function ViewBrand({
  id,
  open,
  onOpenChange,
  data,
}: ViewBrandProps) {
  const brand = data?.find((b) => b.id === id);

  if (!brand) return null;

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Brand Details</DialogTitle>
          <DialogDescription>
            View and manage details of brand partner {brand.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted border-border/50 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-2">
              {brand.image?.url ? (
                <img
                  src={brand.image.url}
                  alt={brand.name}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              ) : (
                <Icon.PackageIcon className="text-muted-foreground/40 h-10 w-10" />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {brand.name}
                </h3>
                <p className="text-muted-foreground text-sm font-medium">
                  @{brand.slug}
                </p>
              </div>
              <Badge
                className="w-fit"
                variant={
                  brand.status === "active"
                    ? "success"
                    : brand.status === "archived"
                      ? "destructive"
                      : "secondary"
                }
              >
                {brand.status}
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
                <span>{brand.productsCount} Products</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Registration
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.CalendarIcon className="text-primary h-4 w-4" />
                <span>{formatShortDate(brand.createdAt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Activity
              </p>
              <div className="flex items-center gap-2 font-semibold">
                <Icon.ClockIcon className="text-primary h-4 w-4" />
                <span>{formatRelativeTime(new Date(brand.updatedAt))}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                Brand Identifier
              </p>
              <div className="mt-1 flex items-center gap-2">
                <code className="bg-muted rounded p-1 font-mono text-[10px] break-all">
                  {brand.id}
                </code>
              </div>
            </div>
          </div>
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
