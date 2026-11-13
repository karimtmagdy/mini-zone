import * as React from "react"
import { memo } from "react"

import { cn } from "@/lib/utils"

type BaseProps<T extends React.ElementType> = {
  as?: T
  children: React.ReactNode
  className?: string
}

type Props<T extends React.ElementType> = BaseProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps<T>>

function BaseCardForm<T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...props
}: Props<T>) {
  const Component = as || "div"

  return (
    <Component
      {...props}
      className={cn(
        "w-full max-w-lg bg-background",
        Component === "form"
          ? "flex flex-col gap-2 rounded-2xl border p-6"
          : "space-y-2",
        className
      )}
    >
      {children}
    </Component>
  )
}

export const CardForm = memo(BaseCardForm) as typeof BaseCardForm
