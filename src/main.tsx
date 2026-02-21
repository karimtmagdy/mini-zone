import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Toaster as SonnerToaster } from "sonner";
import { DirectionProvider } from "@/components/ui/direction";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <DirectionProvider dir="ltr">
            <App />
          </DirectionProvider>
        </TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <SonnerToaster position="top-center" />
      <Analytics debug={import.meta.env.DEV} />
      <SpeedInsights debug={import.meta.env.DEV} />
    </ThemeProvider>
  </StrictMode>,
);
