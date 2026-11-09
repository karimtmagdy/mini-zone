import * as React from "react"
import { cn } from "@/lib/utils"

export function HeaderRoot({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur-lg transition-[width,height] ease-linear",
        "group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 supports-backdrop-filter:bg-background/60",
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
}
