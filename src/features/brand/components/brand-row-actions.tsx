import { useState } from "react"
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  CircleDotIcon,
  EllipsisIcon,
  EyeIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePermission } from "@/features/auth/hooks/use-permission"
import { BrandView } from "@/features/brand/components/brand-view"
import { UpdateBrandForm } from "@/features/brand/components/update-brand-form"
import { useArchiveBrand } from "@/features/brand/hooks/use-archive-brand"
import { useDeleteBrand } from "@/features/brand/hooks/use-delete-brand"
import { useRestoreBrand } from "@/features/brand/hooks/use-restore-brand"
import { useUpdateBrandStatus } from "@/features/brand/hooks/use-update-brand-status"
import type {
  BrandEntity,
  BrandStatus,
} from "@/features/brand/model/brand.entity"
import { BRAND_STATUS_OPTIONS } from "@/features/brand/model/brand.schema"

/** Row actions menu: view, edit, status, archive and delete a brand. */
export function BrandRowActions({ brand }: { brand: BrandEntity }) {
  const { can } = usePermission()
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const remove = useDeleteBrand(() => setDeleteOpen(false))
  const archive = useArchiveBrand()
  const restore = useRestoreBrand()
  const updateStatus = useUpdateBrandStatus()

  const canUpdate = can("brand:update")
  const canDelete = can("brand:delete")

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${brand.name}`}
            >
              <EllipsisIcon />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setViewOpen(true)}>
            <EyeIcon />
            View
          </DropdownMenuItem>
          {canUpdate && (
            <>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                <PencilIcon />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <CircleDotIcon />
                  Change status
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={brand.status}
                    onValueChange={(value) =>
                      updateStatus.mutate({
                        id: brand.id,
                        status: value as BrandStatus,
                      })
                    }
                  >
                    {BRAND_STATUS_OPTIONS.map((option) => (
                      <DropdownMenuRadioItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              {brand.isArchived ? (
                <DropdownMenuItem
                  disabled={restore.isPending}
                  onClick={() => restore.mutate(brand.id)}
                >
                  <ArchiveRestoreIcon />
                  Restore
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  disabled={archive.isPending}
                  onClick={() => archive.mutate(brand.id)}
                >
                  <ArchiveIcon />
                  Archive
                </DropdownMenuItem>
              )}
            </>
          )}
          {canDelete && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                disabled={remove.isPending}
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <BrandView brand={brand} open={viewOpen} onOpenChange={setViewOpen} />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {brand.name}</DialogTitle>
            <DialogDescription>Update brand name or status.</DialogDescription>
          </DialogHeader>
          {editOpen && (
            <UpdateBrandForm
              brand={brand}
              onUpdated={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {brand.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the brand and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={remove.isPending}
              onClick={() => remove.mutate(brand.id)}
            >
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
