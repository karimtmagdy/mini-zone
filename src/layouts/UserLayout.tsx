import UserHeader from "@/components/common/header/UserHeader";
import Footer from "@/components/atoms/user/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <UserHeader />
      {/* <main className="flex-1"> */}
        <Outlet />
      {/* </main> */}
      <Footer />
    </div>
  );
}
