import { cn } from "@/lib/utils";

export default function HeaderForm({
  className,
  title,
  description,
}: {
  className?: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center gap-1 text-center", className)}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-sm text-balance">
        {description}
      </p>
    </div>
  );
}
