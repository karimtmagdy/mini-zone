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
