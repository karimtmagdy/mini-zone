import type { EmpJobRole } from "@/features/auth/model/auth.entity"

export type EmpDepartment =
  | "hr"
  | "engineering"
  | "sales"
  | "marketing"
  | "finance"
  | "support"
  | "management"
  | "operations"
  | "it"

export type EmpJob =
  | "specialist"
  | "coordinator"
  | "director"
  | "lead"
  | "associate"
  | "consultant"

export type EmployeeStatus =
  | "pending"
  | "active"
  | "suspended"
  | "inactive"
  | "terminated"
  | "banned"
  | "archive"

export interface EmployeeEntity {
  readonly id: string
  readonly userId: string
  readonly code: string
  readonly department: EmpDepartment
  readonly job: EmpJob
  readonly jobRole: EmpJobRole
  readonly salary: number
  readonly hiredAt: string
  readonly leftAt: string | null
  readonly status: EmployeeStatus
  readonly isArchived: boolean
  readonly archivedAt: string | null
  readonly createdAt: string
  readonly updatedAt: string
}

export interface IBootstrapAdminPayload {
  department: EmpDepartment
  job: EmpJob
  salary?: number
}

export interface ICreateEmployeePayload {
  userId: string
  department: EmpDepartment
  job: EmpJob
  jobRole: EmpJobRole
  salary?: number
  status?: EmployeeStatus
}

export interface IUpdateEmployeePayload {
  department?: EmpDepartment
  job?: EmpJob
  jobRole?: EmpJobRole
  salary?: number
  status?: EmployeeStatus
}

export interface IHireEmployeePayload {
  username: string
  email: string
  password: string
  department: EmpDepartment
  job: EmpJob
  jobRole: EmpJobRole
  salary?: number
  status?: EmployeeStatus
}
