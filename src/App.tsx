import {
  createBrowserRouter as create,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import { PagesError } from "@/core/router/error.routes";
import { PagesAuth } from "@/core/router/auth.routes";
import HomePage from "@/pages/home/HomePage";
import UserLayout from "@/layouts/UserLayout";
import { PagesAdmin } from "@/core/router/admin.routes";
import AccountLayout from "@/layouts/AccountLayout";
 
export function App() {
  const router = create([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        ...PagesAuth,
        ...PagesAdmin,
        {
          path: "/",
          element: <UserLayout />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
          ],
        },
        {
          path: "/account",
          element: <AccountLayout />,
          // children: [
          //   {
          //     index: true,
          //     element: <ProfileForm />,
          //   },
          // ],
        },
        ...PagesError,
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
