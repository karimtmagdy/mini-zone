import { describe, expect, it } from "vitest"

import { loginZod, registerZod } from "@/features/auth/model/auth.schema"

describe("loginZod", () => {
  it("normalizes the email casing", () => {
    const parsed = loginZod.parse({
      email: "Admin@Gmail.com",
      password: "123456",
    })

    expect(parsed.email).toBe("admin@gmail.com")
  })

  it("defaults remember to false", () => {
    const parsed = loginZod.parse({
      email: "admin@gmail.com",
      password: "123456",
    })

    expect(parsed.remember).toBe(false)
  })

  it("rejects an invalid email and a short password", () => {
    const result = loginZod.safeParse({
      email: "not-an-email",
      password: "123",
    })

    expect(result.success).toBe(false)
  })
})

describe("registerZod", () => {
  const valid = {
    username: "admin",
    email: "Admin@Gmail.com",
    password: "123456",
    confirm: "123456",
  }

  it("normalizes the email and keeps the rest of the payload", () => {
    const parsed = registerZod.parse(valid)

    expect(parsed.email).toBe("admin@gmail.com")
    expect(parsed.username).toBe("admin")
  })

  it("rejects mismatched passwords", () => {
    const result = registerZod.safeParse({ ...valid, confirm: "654321" })

    expect(result.success).toBe(false)
  })

  it("rejects a username shorter than three characters", () => {
    const result = registerZod.safeParse({ ...valid, username: "ab" })

    expect(result.success).toBe(false)
  })
})
