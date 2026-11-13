import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Outlet />
    </div>
  )
}
