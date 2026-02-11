import { cn } from "@/lib/utils";
import React from "react";

export default function RootHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex h-12 shrink-0 items-center justify-between gap-2 border-b px-4 py-2 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12",
        className,
      )}
      {...props}
    >
      {children}
    </header>
  );
}
