// import React from "react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarGroup,
//   SidebarGroupContent,
// } from "@/components/ui/sidebar";
// import { NavLink, useLocation } from "react-router-dom"; // Import useLocation
// import { cn } from "@/lib/utils";
// // import ButtomSideBar from "../sidebar/ButtomSideBar";
// import ApplicationSidebar from "./ApplicationSidebar";
// import CrudSidebar from "./CrudSidebar";
// // import TopSidebar from "./TopSidebar";
// import { Icon } from "@/assets/icon/icons";

// function SidebarLink({
//   to,
//   children,
// }: {
//   to: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <NavLink to={to} end={true} className="flex w-full items-center">
//       {({ isActive }) => (
//         <SidebarMenuButton
//           asChild
//           tooltip={to}
//           isActive={isActive}
//           className={cn(isActive ? "text-primary" : "")}
//         >
//           {children}
//         </SidebarMenuButton>
//       )}
//     </NavLink>
//   );
// }
// export function AppSidebars() {
//   const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
//   const location = useLocation(); // Get current location

//   const mainNavigation = [
//     { title: "Dashboard", icon: Icon.LayoutDashboardIcon, url: "/admin/dashboard" }, // Changed URL to /admin
//     { title: "Overview", icon: Icon.LayoutDashboardIcon, url: "/admin/overview" },
//     { title: "Users", icon: Icon.UsersIcon, url: "/admin/users" },
//     { title: "Products", icon: Icon.PackageIcon, url: "/admin/products" },
//   ];

//   const settingsMenuItems = [
//     { title: "Users", icon: Icon.UsersIcon, url: "/admin/settings/users" },
//     { title: "Products", icon: Icon.PackageIcon, url: "/admin/settings/products" },
//     { title: "Orders", icon: Icon.PackageIcon, url: "/admin/settings/orders" },
//   ];

//   // Determine if any settings child route is active
//   const isSettingsActive = settingsMenuItems.some((item) =>
//     location.pathname.startsWith(item.url),
//   );

//   React.useEffect(() => {
//     // Open settings submenu if any child route is active
//     if (isSettingsActive) {
//       setIsSettingsOpen(true);
//     }
//   }, [isSettingsActive]);

//   return (
//     <Sidebar  side="right">
//       {/* <TopSidebar /> */}
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <ApplicationSidebar mainNavigation={mainNavigation} />

//               {/* Settings Submenu */}
//               <CrudSidebar
//                 settingsMenuItems={settingsMenuItems}
//                 isSettingsOpen={isSettingsOpen}
//                 isSettingsActive={isSettingsActive}
//                 setIsSettingsOpen={setIsSettingsOpen}
//               />
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
