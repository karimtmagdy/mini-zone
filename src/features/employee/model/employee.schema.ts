import { z } from "zod/v4"

const DEPARTMENTS = [
  "hr",
  "engineering",
  "sales",
  "marketing",
  "finance",
  "support",
  "management",
  "operations",
  "it",
] as const

const JOBS = [
  "specialist",
  "coordinator",
  "director",
  "lead",
  "associate",
  "consultant",
] as const

const JOB_ROLES = [
  "admin",
  "manager",
  "warehouseManager",
  "sales",
  "accountant",
] as const

const STATUSES = [
  "pending",
  "active",
  "suspended",
  "inactive",
  "terminated",
  "banned",
  "archive",
] as const

export const createEmployeeZod = z
  .object({
    username: z
      .string({ message: "username is required" })
      .trim()
      .min(3, "username must be at least 3 characters")
      .max(50, "username must be less than 50 characters")
      .describe("login username for the new staff account"),
    email: z
      .email("Invalid email address")
      .trim()
      .toLowerCase()
      .describe("login email for the new staff account"),
    password: z
      .string({ message: "password is required" })
      .min(6, "password must be at least 6 characters")
      .max(30, "password must be less than 30 characters")
      .describe("temporary password"),
    confirm: z
      .string({ message: "please confirm your password" })
      .min(6, "password must be at least 6 characters")
      .describe("repeat the temporary password"),
    department: z.enum(DEPARTMENTS, { message: "department is required" }),
    job: z.enum(JOBS, { message: "job is required" }),
    jobRole: z.enum(JOB_ROLES, { message: "job role is required" }),
    salary: z.coerce.number().nonnegative().default(0),
  })
  .refine((data) => data.password === data.confirm, {
    message: "passwords do not match",
    path: ["confirm"],
  })

export const updateEmployeeZod = z.object({
  department: z.enum(DEPARTMENTS, { message: "department is required" }),
  job: z.enum(JOBS, { message: "job is required" }),
  jobRole: z.enum(JOB_ROLES, { message: "job role is required" }),
  salary: z.coerce.number().nonnegative().default(0),
  status: z.enum(STATUSES, { message: "status is required" }),
})

export type TCreateEmployeeDTO = z.input<typeof createEmployeeZod>
export type TCreateEmployeeEX = z.output<typeof createEmployeeZod>
export type TUpdateEmployeeDTO = z.input<typeof updateEmployeeZod>
export type TUpdateEmployeeEX = z.output<typeof updateEmployeeZod>

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((value) => ({
  label: value,
  value,
}))

export const JOB_OPTIONS = JOBS.map((value) => ({
  label: value,
  value,
}))

export const JOB_ROLE_OPTIONS = JOB_ROLES.map((value) => ({
  label: value,
  value,
}))

export const STATUS_OPTIONS = STATUSES.map((value) => ({
  label: value,
  value,
}))
