import {
  createBrowserRouter as create,
  RouterProvider,
} from "react-router-dom";
import LayoutRoot from "@/layouts/LayoutRoot";
import { PagesError } from "@/core/router/error.routes";
import { PagesAuth } from "@/core/router/auth.routes";
import HomePage from "@/pages/home/HomePage";
import LayoutUser from "@/layouts/LayoutUser";
import { PagesAdmin } from "@/core/router/admin.routes";

export function App() {
  const router = create([
    {
      path: "/",
      element: <LayoutRoot />,
      children: [
        ...PagesAuth,
        ...PagesAdmin,
        {
          path: "/",
          element: <LayoutUser />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
          ],
        },
        ...PagesError,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
