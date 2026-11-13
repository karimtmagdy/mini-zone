import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"

import "./index.css"
import App from "./App.tsx"
import { queryClient } from "@/core/query-client.ts"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { BroadcastProvider } from "react-broadcast-sync"
import { TooltipProvider } from "@/components/ui/tooltip.tsx"
import { Toaster } from "@/components/ui/toast.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BroadcastProvider channelName="dashboard">
        <ThemeProvider>
          <TooltipProvider>
            <App />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </BroadcastProvider>
    </QueryClientProvider>
  </StrictMode>
)
