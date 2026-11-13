import type { UserEntity } from "@/features/auth/model/auth.entity"
import type { IAuthResult, IAuthSession } from "@/features/auth/model/auth.port"

const TOKEN_KEY = "token"
const USER_KEY = "user"

export class AuthSession implements IAuthSession {
  save(session: IAuthResult, remember = false): void {
    const target = remember ? localStorage : sessionStorage
    const stale = remember ? sessionStorage : localStorage

    stale.removeItem(TOKEN_KEY)
    stale.removeItem(USER_KEY)

    target.setItem(TOKEN_KEY, session.token)
    target.setItem(USER_KEY, JSON.stringify(session.user))
  }

  replace(session: IAuthResult): void {
    const target = this.activeStorage()
    target.setItem(TOKEN_KEY, session.token)
    target.setItem(USER_KEY, JSON.stringify(session.user))
  }

  setToken(token: string): void {
    this.activeStorage().setItem(TOKEN_KEY, token)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
  }

  getUser(): UserEntity | null {
    const raw =
      localStorage.getItem(USER_KEY) ?? sessionStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as UserEntity) : null
  }

  clear(): void {
    for (const storage of [localStorage, sessionStorage]) {
      storage.removeItem(TOKEN_KEY)
      storage.removeItem(USER_KEY)
    }
  }

  /** The storage currently holding the session (defaults to per-tab). */
  private activeStorage(): Storage {
    return localStorage.getItem(TOKEN_KEY) ? localStorage : sessionStorage
  }
}

export const authSession = new AuthSession()
