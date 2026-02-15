const STORAGE_KEY = "hasVisited";

document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById("welcome-screen") as HTMLDivElement | null;
  const closeBtn = document.getElementById("close-welcome") as HTMLButtonElement | null;

  if (!welcomeScreen || !closeBtn) return;

  const hasVisited = localStorage.getItem(STORAGE_KEY);

  if (!hasVisited) {
    welcomeScreen.classList.remove("hidden");
  }

  closeBtn.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, "true");
    welcomeScreen.classList.add("hidden");
  });
});

export default function FirstTimeVisitor() {
  return (
    <div
      className="container mx-auto flex h-dvh items-center justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-32"
      id="welcome-screen"
    >
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
  );
}
