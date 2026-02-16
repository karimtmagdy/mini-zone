import { useEffect, useState } from "react";

const STORAGE_KEY = "welcomeExpiry";
const FIVE_SECONDS = 5000;
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export default function FirstTimeVisitor() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const now = Date.now();
    const expiry = localStorage.getItem(STORAGE_KEY);

    // Show if never visited or expired
    if (!expiry || now > Number(expiry)) {
      setIsVisible(true);
      document.body.classList.add("overflow-hidden");

      const timer = setTimeout(() => {
        handleClose();
      }, FIVE_SECONDS);

      return () => {
        clearTimeout(timer);
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, []);

  const handleClose = () => {
    const expiryDate = Date.now() + SEVEN_DAYS;
    localStorage.setItem(STORAGE_KEY, expiryDate.toString());
    document.body.classList.remove("overflow-hidden");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="bg-background no-scrollbar fixed inset-0 z-50 mx-auto flex h-dvh w-full items-center justify-center px-4 py-20 will-change-scroll sm:px-6 lg:px-8 lg:py-32"
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
