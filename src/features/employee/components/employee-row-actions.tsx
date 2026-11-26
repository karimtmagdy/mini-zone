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
import { EmployeeView } from "@/features/employee/components/employee-view"
import { UpdateEmployeeForm } from "@/features/employee/components/update-employee-form"
import { useArchiveEmployee } from "@/features/employee/hooks/use-archive-employee"
import { useDeleteEmployee } from "@/features/employee/hooks/use-delete-employee"
import { useRestoreEmployee } from "@/features/employee/hooks/use-restore-employee"
import { useUpdateEmployeeStatus } from "@/features/employee/hooks/use-update-employee-status"
import type {
  EmployeeEntity,
  EmployeeStatus,
} from "@/features/employee/model/employee.entity"
import { STATUS_OPTIONS } from "@/features/employee/model/employee.schema"

/** Row actions menu: view, edit, status, archive and delete an employee. */
export function EmployeeRowActions({ employee }: { employee: EmployeeEntity }) {
  const { can, account } = usePermission()
  const [viewOpen, setViewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const remove = useDeleteEmployee(() => setDeleteOpen(false))
  const archive = useArchiveEmployee()
  const restore = useRestoreEmployee()
  const updateStatus = useUpdateEmployeeStatus()
  const canUpdate = can("employee:update")
  const canDelete = can("employee:delete")

  // Guardrails mirroring the backend: you cannot delete your own account,
  // and the main admin account cannot be deleted by anyone.
  const isSelf = Boolean(account) && account?.user.id === employee.userId
  const isMainAdmin = employee.jobRole === "admin"
  const deleteBlocked = isSelf || isMainAdmin
  const deleteBlockedHint = isSelf
    ? "Own account"
    : isMainAdmin
      ? "Main admin"
      : null

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Actions for ${employee.code}`}
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
                    value={employee.status}
                    onValueChange={(value) =>
                      updateStatus.mutate({
                        id: employee.id,
                        status: value as EmployeeStatus,
                      })
                    }
                  >
                    {STATUS_OPTIONS.map((option) => (
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
              {employee.isArchived ? (
                <DropdownMenuItem
                  disabled={restore.isPending}
                  onClick={() => restore.mutate(employee.id)}
                >
                  <ArchiveRestoreIcon />
                  Restore
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  disabled={archive.isPending}
                  onClick={() => archive.mutate(employee.id)}
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
                disabled={deleteBlocked || remove.isPending}
                onClick={() => setDeleteOpen(true)}
              >
                <Trash2Icon />
                Delete
                {deleteBlockedHint && (
                  <span className="ms-auto text-xs font-normal text-muted-foreground">
                    {deleteBlockedHint}
                  </span>
                )}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EmployeeView
        employee={employee}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit {employee.code}</DialogTitle>
            <DialogDescription>
              Update department, job, salary or status.
            </DialogDescription>
          </DialogHeader>
          {editOpen && (
            <UpdateEmployeeForm
              employee={employee}
              onUpdated={() => setEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {employee.code}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the employee profile and cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={remove.isPending}
              onClick={() => remove.mutate(employee.id)}
            >
              {remove.isPending ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
