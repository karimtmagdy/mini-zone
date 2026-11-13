import type { UserEntity } from "@/features/auth/model/auth.entity"

/** Credentials accepted by the login endpoint. */
export interface ILoginPayload {
  email: string
  password: string
}

/** Payload accepted by the register endpoint. */
export interface IRegisterPayload {
  username: string
  email: string
  password: string
  confirm: string
}

/** Result of a successful login / refresh: an access token plus the user. */
export interface IAuthResult {
  token: string
  user: UserEntity
}

/** Subset of the user returned right after registration. */
export interface IRegisterResult {
  id: string
  email: string
}

/** Transport port for the auth endpoints. */
export interface IAuthApi {
  login(payload: ILoginPayload): Promise<IAuthResult>
  register(payload: IRegisterPayload): Promise<IRegisterResult>
  me(): Promise<UserEntity>
  refresh(): Promise<IAuthResult>
  logout(): Promise<void>
}

/** Persistence port for the auth session. */
export interface IAuthSession {
  save(session: IAuthResult, remember?: boolean): void
  /** Rewrites the stored session in place, keeping the current storage target. */
  replace(session: IAuthResult): void
  /** Swaps only the access token, keeping the current storage target. */
  setToken(token: string): void
  getToken(): string | null
  getUser(): UserEntity | null
  clear(): void
}
