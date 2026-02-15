// import FirstTimeVisitor from "@/components/atoms/user/FirstTimeVisitor";

export default function HomePage() {
  return (
    <>
      {/* <FirstTimeVisitor /> */}
      <div className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="from-primary via-primary/90 to-primary/70 bg-linear-to-r bg-clip-text text-4xl font-bold text-transparent sm:text-5xl lg:text-6xl">
            Welcome to MiniZone
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg sm:text-xl">
            Experience the future of digital innovation. Build faster, scale
            smarter, and succeed together.
          </p>
        </div>
      </div>
    </>
  );
}
