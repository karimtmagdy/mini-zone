import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { PageForbidden } from "@/pages/error/PageForbidden"
import { PageUnauthorized } from "@/pages/error/PageUnauthorized"
import { PageNotFound } from "@/pages/error/PageNotFound"
import { PATHS } from "@/lib/router/basic.routes"
import { UserLayout } from "@/components/layout/UserLayout"
import { HomePage } from "@/pages/home/HomePage"
import { Panel } from "@/lib/router/panel.routes"
import { Auth } from "@/lib/router/auth.routes"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: PATHS.error.notFound, element: <PageNotFound /> },
      { path: PATHS.error.unauthorized, element: <PageUnauthorized /> },
      { path: PATHS.error.forbidden, element: <PageForbidden /> },
      {
        path: "",
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      ...Auth,
      ...Panel,
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
