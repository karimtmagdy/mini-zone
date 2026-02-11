import { Outlet } from "react-router-dom";

export default function LayoutRoot() {
  return (
    <div className="min-h-dvh w-full">
      <Outlet />
    </div>
  );
}
