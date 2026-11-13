/** Roles supported by the backend (`USER_ROLE`). */
export type UserRole = "customer" | "employee" | "supplier"

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
 * The signed-in account: the user plus the role carried by the access token.
 * `role` is `null` when no valid token is available.
 */
export interface CurrentAccount {
  user: UserEntity
  role: UserRole | null
}
