import UserHeader from "@/components/common/header/UserHeader";
import Footer from "@/components/common/Footer";
import { Outlet } from "react-router-dom";

export default function LayoutUser() {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
