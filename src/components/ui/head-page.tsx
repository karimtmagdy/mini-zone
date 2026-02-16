import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
// const borders =
//   "border @md:border-purple-700 @lg:border-green-700 @2xl:border-blue-600 @3xl:border-red-500";
// ---------------------- PageHead ----------------------
export function PageHead({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"section"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "section";
  return (
    <Comp
      ref={ref}
      className={cn("group/page-head flex w-full flex-col gap-2", className)}
      {...props}
    />
  );
}
// ---------------------- Row ----------------------
const pageHeadRowVariants = cva(["flex gap-2"], {
  variants: {
    align: {
      between: "justify-between",
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
    },
    responsive: {
      true: "flex-col @2xl:flex-row @2xl:items-center",
      false: "flex-row items-center",
    },
  },
  defaultVariants: {
    align: "between",
    responsive: true,
  },
});
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
// ---------------------- Title ----------------------
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
        "-mb-1 text-2xl font-bold tracking-tight",
        "@md:text-3xl @lg:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
// ---------------------- Description ----------------------
export function PageHeadDescription({
  className,
  asChild = false,
  ref,
  ...props
}: React.ComponentPropsWithRef<"p"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "p";
  return (
    <Comp
      ref={ref}
      className={cn(
        "text-xxs/relaxed text-muted-foreground text-pretty",
        "@md:text-xs/relaxed @lg:text-sm/relaxed",
        className,
      )}
      {...props}
    />
  );
}
// ---------------------- Actions ----------------------
export function PageHeadActions({
  className,
  asChild = false,
  align, //= "end",
  responsive,
  ref,
  ...props
}: React.ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
  align?: "between" | "start" | "end" | "center";
  responsive?: "col" | "row";
}) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      ref={ref}
      className={cn(
        "flex gap-2",
        align === "between" && "self-between",
        align === "start" && "self-start",
        align === "end" && "self-end",
        align === "center" && "self-center",
        responsive === "col" && "flex-col",
        responsive === "row" && "flex-row",
        className,
      )}
      {...props}
    />
  );
}
