import { PanelLayout } from "@/components/layout/PanelLayout"
import type { RouteObject } from "react-router-dom"
import { PATHS } from "./basic.routes"
import { BrandsPage } from "@/pages/admin/brands/BrandsPage"
import { DashboardPage } from "@/pages/admin/dashboard/DashboardPage"
import { RequireRole } from "@/features/auth/components/require-role"
import { PANEL_ROLES } from "@/features/auth/model/auth.menu"

import { CategoriesPage } from "@/pages/admin/categories/CategoriesPage"
import { ProductsPage } from "@/pages/admin/products/ProductsPage"
import { SubcategoriesPage } from "@/pages/admin/subcategories/SubcategoriesPage"
import { InventoryPage } from "@/pages/admin/inventory/InventoryPage"
import { EmployeesPage } from "@/pages/admin/employees/EmployeesPage"
import { PromotionsPage } from "@/pages/admin/promotions/PromotionsPage"
import { PurchasePage } from "@/pages/admin/purchase/PurchasePage"
import { SalesOrdersPage } from "@/pages/admin/salesOrders/SalesOrdersPage"
import { StockAdjustmentsPage } from "@/pages/admin/stockAdjustments/StockAdjustmentsPage"
import { UsersPage } from "@/pages/admin/users/UsersPage"
import { WarehousesPage } from "@/pages/admin/warehouses/WarehousesPage"
import { StockTransfersPage } from "@/pages/admin/stockTransfers/StockTransfersPage"

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
        path: PATHS.panel.products,
        element: <ProductsPage />,
        handle: {
          crumb: () => "products",
        },
      },
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
      {
        path: PATHS.panel.categories,
        element: <CategoriesPage />,
        handle: {
          crumb: () => "categories",
        },
      },
      {
        path: PATHS.panel.subcategories,
        element: <SubcategoriesPage />,
        handle: {
          crumb: () => "subcategories",
        },
      },
      {
        path: PATHS.panel.inventory,
        element: <InventoryPage />,
        handle: {
          crumb: () => "inventory",
        },
      },
      {
        path: PATHS.panel.salesOrders,
        element: <SalesOrdersPage />,
        handle: {
          crumb: () => "salesOrders",
        },
      },
      {
        path: PATHS.panel.purchase,
        element: <PurchasePage />,
        handle: {
          crumb: () => "purchase",
        },
      },
      {
        path: PATHS.panel.promotions,
        element: <PromotionsPage />,
        handle: {
          crumb: () => "promotions",
        },
      },
      {
        path: PATHS.panel.employees,
        element: <EmployeesPage />,
        handle: {
          crumb: () => "employees",
        },
      },
      {
        path: PATHS.panel.users,
        element: <UsersPage />,
        handle: {
          crumb: () => "users",
        },
      },
      {
        path: PATHS.panel.stockAdjustments,
        element: <StockAdjustmentsPage />,
        handle: {
          crumb: () => "stockAdjustments",
        },
      },
      {
        path: PATHS.panel.warehouses,
        element: <WarehousesPage />,
        handle: {
          crumb: () => "warehouses",
        },
      },
      {
        path: PATHS.panel.stockTransfers,
        element: <StockTransfersPage />,
        handle: {
          crumb: () => "stockTransfers",
        },
      },
    ],
  },
] as RouteObject[]
