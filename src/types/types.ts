import { type LucideIcon } from "lucide-react"

export interface IBaseMetadata {
  readonly id: string
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
  // createdBy: string
  // updatedBy: string
  // deletedBy: string
}

export interface IBaseImage {
  image: {
    url: string
    publicId: string
  }
}

export interface IBaseImageArray extends IBaseMetadata {
  images: {
    image: IBaseImage
  }[]
}

export interface PaginationMeta {
  page: number
  pages: number
  limit: number
  total: number
  results: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: "success" | "error" | "fail"
}

export interface PaginationResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta
}

/** The normalized shape returned by the `select` in list query hooks */
export type PaginationResult<T> = {
  list: T[]
  total: number
  pages: number
}

export interface ApiError {
  message: string
  code: string
  errors?: Record<string, string[]>
}

export interface NavItemData {
  title: string
  url?: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavItemData[]
}

export type ModalType = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export type ModalIdType = ModalType & {
  id: string
}
