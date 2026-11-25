import { jwtDecode } from "jwt-decode"

import type {
  CurrentAccount,
  Permission,
  UserEntity,
  UserRole,
} from "@/features/auth/model/auth.entity"

/** Claims carried by the backend access token. */
export interface AccessTokenClaims {
  sub: string
  role: UserRole
  permissions?: Permission[]
  type: "access"
}

/** Reads the claims from an access token, or `null` when missing/invalid. */
export function readTokenClaims(token: string | null): AccessTokenClaims | null {
  if (!token) return null

  try {
    return jwtDecode<AccessTokenClaims>(token)
  } catch {
    return null
  }
}

/** Combines a user with the role/permissions carried by the matching access token. */
export function buildCurrentAccount(
  user: UserEntity,
  token: string | null
): CurrentAccount {
  const claims = readTokenClaims(token)

  return {
    user,
    role: claims?.role ?? null,
    permissions: claims?.permissions ?? [],
  }
}
