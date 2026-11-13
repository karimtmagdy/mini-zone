import { z } from "zod/v4"

export const loginZod = z.object({
  email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .describe("enter your email"),
  password: z
    .string({ message: "password is required" })
    .min(6, "password must be at least 6 characters")
    .max(30, "password must be less than 30 characters")
    .describe("enter your password"),
  remember: z.boolean().default(false),
})

export const registerZod = z
  .object({
    username: z
      .string({ message: "username is required" })
      .trim()
      .min(3, "username must be at least 3 characters")
      .max(50, "username must be less than 50 characters")
      .describe("enter your username"),
    email: z
      .email("Invalid email address")
      .trim()
      .toLowerCase()
      .describe("enter your email"),
    password: z
      .string({ message: "password is required" })
      .min(6, "password must be at least 6 characters")
      .max(30, "password must be less than 30 characters")
      .describe("enter your password"),
    confirm: z
      .string({ message: "please confirm your password" })
      .min(6, "password must be at least 6 characters")
      .max(30, "password must be less than 30 characters")
      .describe("repeat your password"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "passwords do not match",
    path: ["confirm"],
  })

/** Raw form values (what the user types). */
export type TLoginDTO = z.input<typeof loginZod>
/** Validated payload that flows into the api layer. */
export type TLoginEX = z.output<typeof loginZod>

/** Raw form values (what the user types). */
export type TRegisterDTO = z.input<typeof registerZod>
/** Validated payload that flows into the api layer. */
export type TRegisterEX = z.output<typeof registerZod>
