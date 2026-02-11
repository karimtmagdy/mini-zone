import { Outlet } from "react-router-dom";

export default function LayoutAuth() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
