import { Outlet } from "react-router-dom"
import { HeaderLogo } from "../header/HeaderLogo"
 // flex min-h-svh w-screen flex-col overflow-x-hidden
export function UserLayout() {
  return (
    <div>
      <HeaderLogo />
      <div className="">
        <Outlet />
      </div>
      <footer>footer</footer>
    </div>
  )
}
