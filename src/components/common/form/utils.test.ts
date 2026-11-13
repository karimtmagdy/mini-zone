import { describe, expect, it, vi } from "vitest"
import { z } from "zod/v4"

import { applyServerErrors, getFieldDescription, parseNumberInput } from "./utils"

describe("getFieldDescription", () => {
  const schema = z.object({
    email: z.email(),
    password: z.string().describe("  enter your password  "),
  })

  it("reads and trims the zod .describe() text", () => {
    expect(getFieldDescription(schema, "password")).toBe("enter your password")
  })

  it("returns the fallback when the field has no description", () => {
    expect(getFieldDescription(schema, "email", "fallback")).toBe("fallback")
  })

  it("returns undefined for an unknown field", () => {
    expect(getFieldDescription(schema, "missing")).toBeUndefined()
  })
})

describe("applyServerErrors", () => {
  it("maps each backend error list onto the form as a joined message", () => {
    const setError = vi.fn()

    applyServerErrors(
      { setError },
      { email: ["taken"], password: ["too short", "missing digit"] }
    )

    expect(setError).toHaveBeenCalledWith("email", {
      type: "server",
      message: "taken",
    })
    expect(setError).toHaveBeenCalledWith("password", {
      type: "server",
      message: "too short, missing digit",
    })
  })

  it("does nothing when there are no errors", () => {
    const setError = vi.fn()

    applyServerErrors({ setError }, undefined)
    applyServerErrors({ setError }, { email: [] })

    expect(setError).not.toHaveBeenCalled()
  })
})

describe("parseNumberInput", () => {
  it("keeps empty input as an empty string", () => {
    expect(parseNumberInput("")).toBe("")
  })

  it("coerces numeric input to a number", () => {
    expect(parseNumberInput("42")).toBe(42)
  })

  it("keeps non-numeric input untouched", () => {
    expect(parseNumberInput("abc")).toBe("abc")
  })
})
