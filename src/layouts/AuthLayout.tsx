import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="w-full max-w-md p-4">
        <Outlet />
      </div>
    </div>
  );
}
