import { type RouteObject } from "react-router-dom";
import PageNotFound from "@/pages/secure/PageNotFound";
import PageUnauthorized from "@/pages/secure/PageUnauthorized";
import PageForbidden from "@/pages/secure/PageForbidden";
export const PagesError = [
  { path: "*", element: <PageNotFound /> },
  { path: "forbidden", element: <PageForbidden /> },
  { path: "unauthorized", element: <PageUnauthorized /> },
] as RouteObject[];
