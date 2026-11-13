import { PanelLayout } from "@/components/layout/PanelLayout"
import type { RouteObject } from "react-router-dom"
import { PATHS } from "./basic.routes"
import { BrandsPage } from "@/pages/admin/brands/BrandsPage"
import { DashboardPage } from "@/pages/admin/dashboard/DashboardPage"
import { RequireRole } from "@/features/auth/components/require-role"
import { PANEL_ROLES } from "@/features/auth/model/auth.menu"

export const Panel = [
  {
    path: PATHS.panel.base,
    element: (
      <RequireRole roles={PANEL_ROLES}>
        <PanelLayout />
      </RequireRole>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
        handle: { crumb: () => "dashboard" },
      },
      {
        path: PATHS.panel.brands,
        element: <BrandsPage />,
        handle: {
          crumb: () => "brands partners",
        },
      },
    ],
  },
] as RouteObject[]
