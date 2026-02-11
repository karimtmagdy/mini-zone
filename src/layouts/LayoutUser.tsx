import UserHeader from "@/components/common/header/UserHeader";
import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  );
}
