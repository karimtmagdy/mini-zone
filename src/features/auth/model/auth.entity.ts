/** Roles supported by the backend (`USER_ROLE`). */
export type UserRole = "customer" | "employee" | "supplier"

/** Staff job roles on the Employee profile (`EMP_ROLE`). */
export type EmpJobRole =
  | "admin"
  | "manager"
  | "warehouseManager"
  | "sales"
  | "accountant"

/** Permission strings issued in the access token. */
export type Permission =
  | "product:read"
  | "product:create"
  | "product:update"
  | "product:delete"
  | "inventory:read"
  | "inventory:stock_in"
  | "inventory:stock_out"
  | "inventory:transfer"
  | "inventory:adjust"
  | "order:create"
  | "order:read"
  | "order:read_own"
  | "order:update"
  | "order:delete"
  | "supplier:read"
  | "supplier:create"
  | "supplier:update"
  | "brand:read"
  | "brand:create"
  | "brand:update"
  | "brand:delete"
  | "employee:read"
  | "employee:create"
  | "employee:update"
  | "employee:delete"
  | "customer:read"
  | "customer:update"

/** Lifecycle status of an account as reported by the backend. */
export type UserStatus = "active" | "blocked"

/**
 * The authenticated user, normalized across the auth endpoints.
 * `status` / `createdAt` are only present on the `/auth/me` payload.
 */
export interface UserEntity {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly status?: UserStatus
  readonly createdAt?: string
}

/**
 * The signed-in account: user + role/permissions from the access token.
 * `role` is `null` when no valid token is available.
 */
export interface CurrentAccount {
  user: UserEntity
  role: UserRole | null
  permissions: Permission[]
}
