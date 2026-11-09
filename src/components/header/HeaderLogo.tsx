import { TriggersToolbar } from "../trigger/TriggersToolbar"
import { HeaderRoot } from "./HeaderRoot"
import logo from "@/assets/react.svg"

export function LogoImg() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center">
      <img src={logo} alt="logo" className="size-6" />
    </div>
  )
}
export function LogoTitle() {
  const title = document.title
  return (
    <span className="max-w-xs truncate text-lg font-bold transition-all duration-200 ease-linear group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0">
      {title}
    </span>
  )
}
export function Logo() {
  return (
    <div className="flex h-16 items-center gap-2 overflow-hidden px-2 transition-[height,gap] duration-200 ease-linear group-has-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:gap-0">
      <LogoImg />
      <LogoTitle />
    </div>
  )
}

export function HeaderLogo() {
  return (
    <HeaderRoot>
      <Logo />
      <TriggersToolbar />
    </HeaderRoot>
  )
}
