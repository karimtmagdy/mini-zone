import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import "./index.css"
import App from "./App"
import { queryClient } from "@/core/query-client"
import { ThemeProvider } from "@/components/theme-provider"
import { BroadcastProvider } from "react-broadcast-sync"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toast"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BroadcastProvider channelName="dashboard">
        <ThemeProvider>
          <TooltipProvider>
            <App />
            <Toaster />
            {import.meta.env.DEV && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </TooltipProvider>
        </ThemeProvider>
      </BroadcastProvider>
    </QueryClientProvider>
  </StrictMode>
)
