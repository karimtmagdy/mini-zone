import { useState } from "react"
import type { PaginationState } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { usePermission } from "@/features/auth/hooks/use-permission"
import { CreateBrandForm } from "@/features/brand/components/create-brand-form"
import { BrandsTable } from "@/features/brand/components/brands-table"
import { useBrands } from "@/features/brand/hooks/use-brands"

export function BrandsPage() {
  const { can } = usePermission()
  const canRead = can("brand:read")
  const canCreate = can("brand:create")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const { data, isLoading, isError, refetch } = useBrands({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  return (
    <main className="space-y-6 p-4">
      <nav className="flex items-center justify-between">
        <article>
          <h1 className="text-xl font-medium">Brands</h1>
          <p className="text-sm text-muted-foreground">
            Manage brand partners linked to your product catalog.
          </p>
        </article>
        <article className="flex items-center gap-2">
          {canCreate && (
            <Dialog>
              <DialogTrigger render={<Button>Add brand</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Brand</DialogTitle>
                  <DialogDescription>
                    Fill in the form to add a new brand.
                  </DialogDescription>
                </DialogHeader>
                <CreateBrandForm
                  onCreated={() => {
                    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
                    void refetch()
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
        </article>
      </nav>

      {canRead ? (
        <BrandsTable
          data={data?.list ?? []}
          total={data?.total ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          isLoading={isLoading}
          isError={isError}
        />
      ) : (
        <div className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <p>
            You need <code>brand:read</code> to view brands.
          </p>
        </div>
      )}
    </main>
  )
}
