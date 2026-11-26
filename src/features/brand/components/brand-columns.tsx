import {
  createColumnHelper,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { BrandRowActions } from "@/features/brand/components/brand-row-actions"
import type {
  BrandEntity,
  BrandStatus,
} from "@/features/brand/model/brand.entity"

export const brandTableFeatures = tableFeatures({ rowPaginationFeature })

const helper = createColumnHelper<typeof brandTableFeatures, BrandEntity>()

const STATUS_VARIANT: Record<
  BrandStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  active: "default",
  inactive: "outline",
  archive: "secondary",
}

export const brandColumns = helper.columns([
  helper.accessor("name", { header: "Name" }),
  helper.accessor("slug", { header: "Slug" }),
  helper.accessor("products", { header: "Products" }),
  helper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue()
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>
    },
  }),
  helper.display({
    id: "actions",
    header: "",
    cell: ({ row }) => <BrandRowActions brand={row.original} />,
  }),
])
