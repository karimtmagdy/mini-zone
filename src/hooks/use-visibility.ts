import { useCallback, useState } from "react"

/** A boolean flag per key, e.g. `{ password: false, email: true }`. */
type VisibilityMap<TKey extends string> = Record<TKey, boolean>

/**
 * Tracks an independent boolean flag per key — for example revealing a password
 * or unlocking a field that stays disabled until it is edited.
 *
 * Pass the keys with `as const` so the returned map stays strictly typed:
 * `useVisibility(["password", "email"] as const)`.
 */
export function useVisibility<TKey extends string>(keys: readonly TKey[]) {
  const [visible, setVisible] = useState<VisibilityMap<TKey>>(
    () =>
      Object.fromEntries(keys.map((key) => [key, false])) as VisibilityMap<TKey>
  )

  const toggle = useCallback((key: TKey) => {
    setVisible((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const setVisibility = useCallback((key: TKey, value: boolean) => {
    setVisible((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { visible, toggle, setVisibility } as const
}
