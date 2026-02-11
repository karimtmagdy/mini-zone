import { type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import LayoutAuth from "@/layouts/LayoutAuth";
import { Spinner } from "@/components/ui/spinner";

const PageChangePassowrd = lazy(() =>
  import("@/pages/auth/PageChangePassowrd").then((module) => ({
    default: module.PageChangePassword,
  })),
);
const PageForgotPassword = lazy(() =>
  import("@/pages/auth/PageForgotPassword").then((module) => ({
    default: module.PageForgotPassword,
  })),
);
const PageResetPassword = lazy(() =>
  import("@/pages/auth/PageResetPassword").then((module) => ({
    default: module.PageResetPassword,
  })),
);
const PageRegister = lazy(() =>
  import("@/pages/auth/PageRegister").then((module) => ({
    default: module.PageRegister,
  })),
);
const PageLogin = lazy(() =>
  import("@/pages/auth/PageLogin").then((module) => ({
    default: module.PageLogin,
  })),
);

export const PagesAuth = [
  {
    path: "auth",
    Component: LayoutAuth,
    children: [
      {
        path: "register",
        element: (
          <Suspense fallback={<AuthFallback />} children={<PageRegister />} />
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<AuthFallback />} children={<PageLogin />} />
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense
            fallback={<AuthFallback />}
            children={<PageChangePassowrd />}
          />
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense
            fallback={<AuthFallback />}
            children={<PageForgotPassword />}
          />
        ),
      },
      {
        path: "reset-password",
        element: (
          <Suspense
            fallback={<AuthFallback />}
            children={<PageResetPassword />}
          />
        ),
      },
    ],
  },
] as RouteObject[];

function AuthFallback() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <Spinner className="text-primary size-10" />
    </div>
  );
}
