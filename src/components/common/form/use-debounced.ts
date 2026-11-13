import { useCallback, useEffect, useRef } from "react"

/**
 * Debounces a callback while keeping a stable identity and always calling the
 * latest version of the callback (so it never goes stale between renders).
 */
export function useDebounced<Args extends unknown[]>(
  callback: ((...args: Args) => void) | undefined,
  delay = 300
) {
  const callbackRef = useRef(callback)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    []
  )

  return useCallback(
    (...args: Args) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => callbackRef.current?.(...args), delay)
    },
    [delay]
  )
}
