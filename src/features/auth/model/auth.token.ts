import { jwtDecode } from "jwt-decode"

import type {
  CurrentAccount,
  UserEntity,
  UserRole,
} from "@/features/auth/model/auth.entity"

/** Claims carried by the backend access token. */
interface AccessTokenClaims {
  sub: string
  role: UserRole
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

/** Combines a user with the role carried by the matching access token. */
export function buildCurrentAccount(
  user: UserEntity,
  token: string | null
): CurrentAccount {
  return { user, role: readTokenClaims(token)?.role ?? null }
}
