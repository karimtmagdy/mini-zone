export type BrandStatus = "active" | "inactive" | "archive"

export interface BrandEntity {
  readonly id: string
  readonly name: string
  readonly slug: string
  readonly products: number
  readonly status: BrandStatus
  readonly isArchived: boolean
  readonly archivedAt: string | null
  readonly createdAt: string
  readonly updatedAt: string
}

export interface ICreateBrandPayload {
  name: string
  status?: BrandStatus
}

export interface IUpdateBrandPayload {
  name?: string
  status?: BrandStatus
}
