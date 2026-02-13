import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export function PageHead({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"header"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "header";
  return (
    <Comp
      ref={ref}
      className={cn(
        "group/page-head @container flex flex-col gap-6",
        className,
      )}
      {...props}
    />
  );
}

const pageHeadRowVariants = cva(
  "flex gap-4 min-w-0 transition-all duration-300",
  {
    variants: {
      align: {
        between: "justify-between",
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
      },
      responsive: {
        true: "flex-col @lg:flex-row @lg:items-center",
        false: "flex-row items-center",
      },
    },
    defaultVariants: {
      align: "between",
      responsive: true,
    },
  },
);

interface PageHeadRowProps
  extends
    React.ComponentPropsWithRef<"div">,
    VariantProps<typeof pageHeadRowVariants> {
  asChild?: boolean;
}

export function PageHeadRow({
  className,
  align,
  responsive,
  asChild = false,
  ref,
  ...props
}: PageHeadRowProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      ref={ref}
      className={cn(pageHeadRowVariants({ align, responsive, className }))}
      {...props}
    />
  );
}

export function PageHeadGroup({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      ref={ref}
      className={cn("flex min-w-0 flex-col gap-1.5", className)}
      {...props}
    />
  );
}

export function PageHeadTitle({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"h1"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "h1";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
        "from-foreground to-foreground/70 bg-linear-to-br bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeadDescription({
  className,
  asChild = false,
  italic = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"p"> & {
  asChild?: boolean;
  italic?: boolean;
}) {
  const Comp = asChild ? Slot.Root : "p";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-muted-foreground max-w-[700px] text-sm/relaxed text-pretty sm:text-base/relaxed",
        italic && "italic",
        className,
      )}
      {...props}
    />
  );
}

export function PageHeadActions({
  className,
  asChild = false,
  align,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
  align?: "between" | "start" | "end" | "center";
}) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex items-center gap-3 select-none",
        className,
        align === "between" && "justify-between",
        align === "start" && "justify-start",
        align === "end" && "justify-end",
        align === "center" && "justify-center",
      )}
      {...props}
    />
  );
}
