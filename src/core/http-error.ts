import { isAxiosError } from "axios"
import type { ApiError } from "@/types/types"

/**
 * Normalizes any thrown value into a human readable message.
 * Prefers the backend `ApiError.message` payload over the raw axios message.
 */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const payload = error.response?.data as Partial<ApiError> | undefined
    if (payload?.message) {
      return payload.message
    }
    return error.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Something went wrong, please try again."
}
