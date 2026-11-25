import { describe, expect, it } from "vitest"

import {
  buildCurrentAccount,
  readTokenClaims,
} from "@/features/auth/model/auth.token"

/** base64url-encodes an ASCII payload without depending on Node APIs. */
function toBase64Url(value: unknown): string {
  return btoa(JSON.stringify(value))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "")
}

function fakeToken(payload: Record<string, unknown>): string {
  const header = toBase64Url({ alg: "HS256", typ: "JWT" })
  const body = toBase64Url(payload)

  return `${header}.${body}.signature`
}

const user = { id: "u1", username: "admin", email: "admin@gmail.com" }

describe("buildCurrentAccount", () => {
  it("reads the role and permissions carried by the access token", () => {
    const token = fakeToken({
      sub: "u1",
      role: "employee",
      permissions: ["employee:read", "brand:read"],
      type: "access",
    })

    expect(buildCurrentAccount(user, token)).toEqual({
      user,
      role: "employee",
      permissions: ["employee:read", "brand:read"],
    })
  })

  it("returns a null role and empty permissions when the token is missing", () => {
    expect(buildCurrentAccount(user, null)).toEqual({
      user,
      role: null,
      permissions: [],
    })
  })
})

describe("readTokenClaims", () => {
  it("returns null for a malformed token", () => {
    expect(readTokenClaims("not-a-jwt")).toBeNull()
  })

  it("returns null for an empty token", () => {
    expect(readTokenClaims(null)).toBeNull()
  })
})
