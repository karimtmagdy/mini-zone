import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

function NavItem({
  children,
  to,
  className,
  ...props
}: {
  children: React.ReactNode;
  to: string;
  className?: string;
}) {
  return (
    <NavLink to={to} className={cn(className)} {...props} end>
      {({ isActive }) => (
        <div
          className={cn(
            isActive &&
              "*:bg-foreground *:hover:text-background *:[&>svg]:text-background *:hover:bg-foreground *:hover:[&>svg]:text-background *:active:bg-foreground *:active:[&>svg]:text-background *:active:text-background *:text-background font-semibold",
          )}
        >
          {children}
        </div>
      )}
    </NavLink>
  );
}
export { NavItem };
