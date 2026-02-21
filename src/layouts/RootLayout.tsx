import { Outlet } from "react-router-dom";
import { PageCompletionOverlay } from "@/dev-tools/page-inspector";

const isDev = import.meta.env.DEV;

export default function RootLayout() {
  return (
    <div className="min-h-dvh w-full">
      <Outlet />
      {isDev && <PageCompletionOverlay />}
    </div>
  );
}
