(function () {
  const storageKey = "vite-ui-theme";
  const theme = localStorage.getItem(storageKey);

  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    if (systemDark) {
      document.documentElement.classList.add("dark");
    }
  }
})();
const STORAGE_KEY = "hasVisited";

document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.getElementById(
    "welcome-screen",
  ) as HTMLDivElement | null;
  const closeBtn = document.getElementById(
    "close-welcome",
  ) as HTMLButtonElement | null;

  if (!welcomeScreen || !closeBtn) return;

  const hasVisited = localStorage.getItem(STORAGE_KEY);

  if (!hasVisited) {
    welcomeScreen.classList.remove("hidden");
  }
  const now = Date.now();
  const expiry = localStorage.getItem(STORAGE_KEY);

  if (!expiry || now > Number(expiry)) {
    welcomeScreen.classList.remove("hidden");
  }

  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  closeBtn.addEventListener("click", () => {
    localStorage.setItem(STORAGE_KEY, "true");
    localStorage.setItem(STORAGE_KEY, (now + SEVEN_DAYS).toString());
    welcomeScreen.classList.add("hidden");
  });
});
