import { cn } from "@/lib/utils";

export function TwIndicator() {
  if (import.meta.env.MODE === "production") return null;
  return (
    <div
      className={cn(
        "absolute bottom-0 translate-x-2/1 *:flex *:items-center *:justify-center",
        "overflow-hidden text-sm font-bold uppercase select-none",
        "pointer-events-none fixed bottom-4 left-4 z-40 font-mono opacity-70",
        "*:text-destructive *:hidden *:size-10 *:rounded-full",
        "*:bg-bg-background/95 *:border *:backdrop-blur-md",
      )}
    >
      <div className="@xs:flex @sm:hidden">xs</div>
      <div className="@sm:flex @md:hidden">sm</div>
      <div className="@md:flex @lg:hidden">md</div>
      <div className="@lg:flex @xl:hidden">lg</div>
      <div className="@xl:flex @2xl:hidden">xl</div>
      <div className="@2xl:flex @3xl:hidden">2xl</div>
      <div className="@3xl:flex @4xl:hidden">3xl</div>
      <div className="@4xl:flex @5xl:hidden">4xl</div>
      <div className="@5xl:flex @6xl:hidden">5xl</div>
      <div className="@6xl:flex @7xl:hidden">6xl</div>
      <div className="@8xl:hidden @7xl:flex">7xl</div>
    </div>
  );
}
