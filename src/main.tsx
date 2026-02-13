import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { ThemeProvider } from "@/context/ThemeContext.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster, } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <App />
        </TooltipProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  </StrictMode>,
);
