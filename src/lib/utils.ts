export { cn } from "cn"

/** Derives up to two uppercase initials from a name, username or handle. */
export function getInitials(name: string) {
  const parts = name.split(/[\s._-]+/).filter(Boolean)
  const initials = parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()

  return initials || name.slice(0, 2).toUpperCase()
}
